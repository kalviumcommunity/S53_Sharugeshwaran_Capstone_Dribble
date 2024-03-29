const Course = require('../Schema/CourseSchema.js')

const course1 = new  Course({
    name : "Freestyle For Beginners",
    description : "Dive into the exciting world of freestyle football, where players learn to perform mesmerizing tricks, flicks, and combinations with the ball using various parts of their body. From basic juggling to advanced moves like around the world and akkas, this course is perfect for players looking to add flair and creativity to their game.",
    category : "Technical Skills",
    modules : [
        {
            name : "Get Started",
            videos: [
                {
                name : "Introduction to Freestyle" ,
                url : "https://www.youtube.com/embed/6Yo2Zs9ICvM?si=--Istm9mWMKLGO-b" 
                }
            ]
        },
        {
            name : "Flick Basics: Entry-Level Tricks",
            videos : [
                {
                    name : "Scoop Flick",
                    url : "https://www.youtube.com/embed/bQkVTYTE-jI?si=q7xB4PF_Ss_08kRQ"
                },
                {
                    name : "Rainbow Flick",
                    url : "https://www.youtube.com/embed/oaccrBga4Xg?si=xElFpXKFGQQFIMmq"
                },
                {
                    name : "Zlatan Ibrahimovic Popcorn Flick",
                    url : "https://www.youtube.com/embed/eWux_kJPmls?si=enP5ixvBtZNPATQv"
                },
            ]
        },{

        }
    ]
})



const course2 = new Course({
    name: "Passing and Receiving Techniques",
    description: "Master the art of passing and receiving the ball with accuracy and control.",
    category: "Technical Skills",
    modules: [
        {
            name: "Passing Fundamentals",
            videos: []
        },
        {
            name: "Types of Passes",
            videos: []
        },
        {
            name: "Receiving Techniques",
            videos: []
        },
        {
            name: "First Touch Control",
            videos: []
        },
        {
            name: "Passing and Receiving in Tight Spaces",
            videos: []
        },
        {
            name: "Crossing Techniques",
            videos: []
        },
        {
            name: "Passing Drills and Exercises",
            videos: []
        }
    ]
});

const course3 = new Course({
    name: "Attacking Tactics and Strategies",
    description: "Learn offensive strategies and formations used in modern football.",
    category: "Tactics & Strategy",
    modules: [
        {
            name: "Attacking Principles",
            videos: []
        },
        {
            name: "Different Attacking Formations",
            videos: []
        },
        {
            name: "Counter-Attacking Strategies",
            videos: []
        },
        {
            name: "Attacking Set Pieces",
            videos: []
        },
        {
            name: "Playing Out from the Back",
            videos: []
        },
        {
            name: "Pressing and High-Line Defense",
            videos: []
        },
        {
            name: "Attacking Against Different Formations",
            videos: []
        },
        {
            name: "Match Analysis of Offensive Tactics",
            videos: []
        }
    ]
});

const course4 = new Course({
    name: "Defending Strategies and Techniques",
    description: "Learn defensive formations, positioning, and tackling techniques.",
    category: "Tactics & Strategy",
    modules: [
        {
            name: "Defensive Principles",
            videos: []
        },
        {
            name: "Types of Defenses",
            videos: []
        },
        {
            name: "Defending Set Pieces",
            videos: []
        },
        {
            name: "Tackling Techniques",
            videos: []
        },
        {
            name: "Pressing and Counter-Pressing",
            videos: []
        },
        {
            name: "Defending Against Different Formations",
            videos: []
        },
        {
            name: "Defensive Drills and Exercises",
            videos: []
        },
        {
            name: "Match Analysis of Defensive Tactics",
            videos: []
        }
    ]
});

const course5= new Course({
    name: "Goalkeeping Fundamentals",
    description: "Learn essential skills and techniques for goalkeepers.",
    category: "Goalkeeping",
    modules: [
        {
            name: "Goalkeeper Positioning and Footwork",
            videos: []
        },
        {
            name: "Catching Techniques",
            videos: []
        },
        {
            name: "Diving and Shot-Stopping",
            videos: []
        },
        {
            name: "Commanding the Area and Communication",
            videos: []
        },
        {
            name: "Goalkeeper Distribution",
            videos: []
        },
        {
            name: "Penalty Saving Techniques",
            videos: []
        }
    ]
});

const course6 = new Course({
    name: "Strength and Conditioning for Football",
    description: "Develop the physical fitness needed for peak performance on the field.",
    category: "Fitness & Conditioning",
    modules: [
        {
            name: "Football-Specific Strength Training Exercises",
            videos: []
        },
        {
            name: "Cardiovascular Endurance Training",
            videos: []
        },
        {
            name: "Plyometric Exercises for Power and Explosiveness",
            videos: []
        },
        {
            name: "Flexibility and Mobility Training",
            videos: []
        },
        {
            name: "Nutrition for Football Players",
            videos: []
        }
    ]
});

const course7 = new Course({
    name: "The History of Football",
    description: "Explore the evolution of football from its origins to the modern game.",
    category: "Football History & Culture",
    modules: [
        {
            name: "Early Forms of Football",
            videos: []
        },
        {
            name: "The Birth of Modern Football",
            videos: []
        },
        {
            name: "The Rise of FIFA and International Football",
            videos: []
        },
        {
            name: "The Development of Club Football Leagues",
            videos: []
        },
        {
            name: "Legendary Players and Teams",
            videos: []
        },
        {
            name: "The Evolution of Football Tactics and Strategies",
            videos: []
        },
        {
            name: "The Impact of Technology on Football",
            videos: []
        },
        {
            name: "The Future of Football",
            videos: []
        }
    ]
});

const course9 = new Course({
    name: "Football Psychology and Mentality",
    description: "Learn mental skills to improve focus, confidence, and performance.",
    category: "Mental Skills & Mindset",
    modules: [
        {
            name: "Mental Toughness and Resilience",
            videos: []
        },
        {
            name: "Goal Setting and Visualization",
            videos: []
        },
        {
            name: "Dealing with Pressure and Stress",
            videos: []
        },
        {
            name: "Team Cohesion and Leadership",
            videos: []
        },
        {
            name: "Recovery and Rest",
            videos: []
        },
        {
            name: "Performance Analysis and Improvement",
            videos: []
        }
    ]
});


const courseData = [course1,course2,course3,course4,course5,course6,course7,course9];

const addData = () => {
    Course.insertMany(courseData)
.then(data => console.log("data added"))
.catch(err => console.error(err))
}

module.exports = {addData};