const { create, getById, update, deleteCourseById, enrollUser } = require('../services/courseService');
const { parseError } = require('../util/parser');

const courseController = require('express').Router();



courseController.get('/create', (req, res) =>{
    res.render('create-course', {
        title: 'Course Create',
    })
});

courseController.get('/:id', async (req, res) =>{
    const course = await getById(req.params.id);

    course.isOwner = course.owner.toString() == req.user._id.toString();
    course.enrolled = course.users.map(x => x.toString()).includes(req.user._id).toString(); // това е за съобщението  че е записъл;

    res.render('details', {
        title: 'Details',
        course
    });
});

courseController.post( '/create', async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    };

    
    try {
        if(Object.values(course).some(v=> !v)){
            throw new Error('All feilds are required')
        }
        const result = await create(course);
        res.redirect('/');
    } catch (error) {
        res.render('create-course', {
           title: 'Create course',
            body: course,
            errors:parseError(error)
        });
       
    }
});







courseController.get('/:id/delete', async(req, res) =>{
    const course =await getById(req.params.id);
   // if(course.owner != req.user._id) {
      if (course.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login')
    } 
    await deleteCourseById(req.params.id)
    res.redirect('/')
});



courseController.get('/:id/edit', async(req, res) =>{
    const course =await getById(req.params.id);
    if(course.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    
    res.render('edit-course', {
        title: 'Edit',
        course
    })
});



courseController.post('/:id/edit', async(req, res) =>{
    const course = await getById(req.params.id);

    if(course.owner.toString() != req.user._id.toString()){
        return res.redirect('/auth/login')
    }

    try { 
        await update(req.params.id, req.body)
        res.redirect(`/course/${req.params.id}`);
    } catch (error) {
        
        res.render('edit-course', {
           title: 'Edit',
            errors:parseError(error),
            course: req.body
        });  
    }
});


courseController.get('/:id/enroll', async(req, res) => {
    const course = await getById(req.params.id);

    if(course.owner.toString() != req.user._id.toString()
    && course.users.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await enrollUser(req.params.id, req.user._id);
    }

    return res.redirect(`/course/${req.params.id}`)

});




module.exports = courseController;