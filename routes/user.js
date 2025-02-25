const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    });

    res.json({
        msg: "Creates a new user account"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    const response = await Course.find({});

    res.json({
        course: response
    })
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const coureseId = req.params.courseId;
    const username = req.headers.username;

        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: coureseId
            }
        });
 
    res.json({
        msg: "purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router