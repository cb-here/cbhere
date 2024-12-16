const Project = require('../models/Project');

const homepage = async (req, res) => {
    try {
        const projects = await Project.find();
        const data = {
            title: 'Home',
            projects: projects
        }
        res.render('index', data);
    } catch(error){
        res.status(404).send("Something going wrong.");
    } 
}

const about = (req, res) => {
    const data = {
        title: 'About'
    }
    res.render('about', data)
}

const createProjectPage = (req, res) => {
    const data = {
        title: 'New Project'
    }
    res.render('new-project', data);
}

const createProject = async (req, res) => {
    try {
        const { title, description, typeOfProject } = req.body;
        const projectImage = req.file ? `/uploads/${req.file.filename}` : null;
    
        const project = new Project({
            title: title,
            description: description,
            typeOfProject: typeOfProject,
            projectImage: projectImage
        });
        await project.save();
        res.redirect('/'); 
    } catch (error) {
        console.error("Error uploading project:", error);
        res.status(500).send("An error occurred");
    }
    
}



module.exports = {
    homepage, about, createProject, createProjectPage
}