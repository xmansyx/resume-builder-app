const Resume = require('../models/Resume');

exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({user: req.userId});
        if (!resumes){
            res.json("you don't have any resumes yet");
        }
        res.json(resumes);
    } catch (error) {
        res.status(500).send(error);
    }
};
// Create a new resume
exports.createResume = async (req, res) => {
    try {
        const newResume = new Resume({
            user: req.userId,
            name: req.body.name,
            summary: req.body.summary,
            experience: req.body.experience,
            education: req.body.education,
            skills: req.body.skills
        });
        await newResume.save();
        res.json({
            "message": "resume created Successfully",
            "data": newResume 
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a single resume
exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            res.status(404).json('Resume not found');
        }
        console.log(resume.user, req.userId )
        if (resume.user != req.userId) {
            res.status(403).json('this is not your resume');
        }

        res.json(resume);
        
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a resume
exports.updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { $set: req.body }, {
            new: true
        });
        if (!resume) {
            res.status(404).json('Resume not found');
        } else {
            res.json({
                "message": "Resume Updated Successfully",
                "data": resume
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
    try {
        req.params.id
        const resume = await Resume.findOneAndRemove({ _id: req.params.id, user: req.userId });
        if (!resume) {
            res.status(404).json('Resume not found');
        } else {
            res.json('Resume deleted successfully');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
