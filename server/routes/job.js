const express = require("express");
const Route = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const auth = require("../middleware/auth");
const sequelize = require("../database/db").Sequelize;
const db = require("../database/db");
const User = db.user;
const Job = db.job;
const Op = sequelize.Op;

//check url
Route.get("/check_url", async (req, res) => {
  const url = req.query.url;

  if (url) {
  }
  const exist = await Job.count({
    where: { url: url }
  });

  if (exist) {
    return res.status(402).json({ msg: "Link already exist" });
  } else {
    return res.status(200).json({ msg: "Already Applied with this Link" });
  }
});

//check company name
Route.get("/check_comp_name", async (req, res) => {
  const company_name = req.query.company_name;

  const exist = await Job.count({
    where: { companyName: company_name }
  });

  if (exist) {
    return res.status(402).json({ msg: "Link already exist" });
  } else {
    return res.status(200).json({ msg: "Already applied" });
  }
});

// Create new job
Route.post(
  "/",
  [
    auth,
    [
      check("company_name", "Company Name is required")
        .not()
        .isEmpty(),
      check("url", "URL Name is required")
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { company_name, url, job_title, location, salary } = req.body;

    const registration_number = req.user.user.id;

    //get current user profile name
    const user_profile = await User.findAll({
      attributes: ["profile"],
      where: {
        registrationNumber: registration_number
      }
    }).map(el => el.get("profile"));
    let profile = user_profile[0];

    //check if company already exist
    const company = await Job.count({
      where: { companyName: company_name }
    });

    if (company) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Company Name Already Exist" }] });
    }

    //chaeck url if already exist
    const link = await Job.count({
      where: { url: url }
    });

    if (link) {
      return res.status(400).json({ errors: [{ msg: "Url Already Exist" }] });
    }
    try {
      let job = await Job.create({
        userId: registration_number,
        companyName: company_name,
        job_title,
        url,
        profile,
        salary,
        location,
        status: "job"
      });
      if (job) {
        res.json({ job });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
);

//Fetch all Job

Route.get("/", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      where: {
        status: "job"
      },
      include: [
        {
          model: User,
          as: "jobId",
          attributes: ["name"]
        }
      ]
    });
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Fetch all leads

Route.get("/leads", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      where: {
        status: {
          [Op.notLike]: "job"
        }
      }
    });
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Delete  Job
Route.post("/delete", auth, async (req, res) => {
  const { id } = req.body;
  console.log(id);
  debugger;

  try {
    const result = await Job.destroy({
      where: {
        id: id
      }
    });
    if (result) {
      return res.status(200).json({ msg: "Deleted" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Update Job
Route.post(
  "/edit",
  [
    auth,
    [
      check("company_name", "Company Name is required")
        .not()
        .isEmpty(),
      check("url", "URL Name is required")
        .not()
        .isEmpty(),
      check("profile", "Profile name is required")
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { id, company_name, url, profile, job_title, salary } = req.body;

    const company = await Job.count({
      where: { companyName: company_name }
    });

    if (company) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Company Name Already Exist" }] });
    }

    const link = await Job.count({
      where: { url: url }
    });

    if (link) {
      return res.status(400).json({ errors: [{ msg: "Url Already Exist" }] });
    }

    const job = await Job.count({
      where: { id: id }
    });

    if (job) {
      try {
        let result = await Job.update(
          {
            companyName: company_name,
            url,
            profile,
            job_title,
            salary
          },
          { where: { id: id } }
        );

        res.json({ result });
      } catch (error) {
        console.log(error.message);
        return res.status(402).json({ msg: "Server Error" });
      }
    }
  }
);

//changed status
Route.post("/changed_staus", auth, async (req, res) => {
  const { id, status } = req.body;

  try {
    let result = await Job.update(
      {
        status
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//changed call status
Route.post("/call_status", auth, async (req, res) => {
  const { id, call_status } = req.body;

  try {
    let result = await Job.update(
      {
        call_status
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//changed call status
Route.post("/lead_status", auth, async (req, res) => {
  const { id, lead_status } = req.body;

  try {
    let result = await Job.update(
      {
        lead_status
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//assign to user
Route.post("/assign_to", auth, async (req, res) => {
  const { id, assignTo } = req.body;

  try {
    let result = await Job.update(
      {
        assignTo
      },
      { where: { id: id } }
    );

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});
//Daily Applied jobs
Route.get("/count", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      attributes: [
        "userId",
        [
          db.Sequelize.fn("count", db.Sequelize.col("registration_number")),
          "count"
        ]
      ],
      where: {
        createdAt: new Date()
      },
      group: ["job.registration_number"],
      raw: true,
      order: db.Sequelize.literal("count DESC")
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});
// My Leads
Route.get("/my_leads", auth, async (req, res) => {
  const id = req.user.user.id;
  try {
    const result = await Job.findAll({
      where: {
        assignTo: id
      }
    });
    if (result) {
      res.json({ result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});
//Update Lead
Route.post(
  "/lead/edit",

  auth,

  async (req, res) => {
    const {
      id,
      profile,
      job_title,
      salary,
      source,
      email,
      website,
      client_name,
      phone_number,
      call_time,
      time_zone,
      call_date
    } = req.body;

    const job = await Job.count({
      where: { id: id }
    });

    if (!job) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This Company Data does not Exist" }] });
    }
    try {
      let result = await Job.update(
        {
          profile,
          job_title,
          salary,
          source,
          email,
          website,
          client_name,
          phone_number,
          call_time,
          time_zone,
          call_date
        },
        { where: { id: id } }
      );

      res.json({ result });
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
  }
);

//Lead Call Scheduler
Route.get("/lead_scedule", auth, async (req, res) => {
  var currentDate = new Date();
  var someDate = new Date();
  var numberOfDaysToAdd = 6;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  console.log(currentDate);
  console.log(someDate);
  try {
    const result = await Job.findAll({
      where: {
        call_date: {
          [Op.between]: [currentDate, someDate] // BETWEEN 6 AND 10
        }
      },
      include: [
        {
          model: User,
          as: "leadId",
          attributes: ["name"]
        }
      ],

      order: ["call_date"]
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

// Previous Week Report and Apis
function getPreviousWeekDate() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 6; // Gets day of the month (e.g. 21) - the day of the week (e.g. wednesday = 3) = Sunday (18th) - 6
  var last = first + 6; // last day is the first day + 6
  var startDate = new Date(curr.setDate(first));
  var endDate = new Date(curr.setDate(last));

  return {
    startDate: startDate,
    endDate: endDate
  };
}
//Total Job Applied Previous Week
Route.get("/status_job_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "job"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_good_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "good_lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_hot_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "hot"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_closed_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "closed"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_rejected_lead_count", auth, async (req, res) => {
  const { startDate, endDate } = getPreviousWeekDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // BETWEEN 6 AND 10
        },
        status: "rejected"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

//Previous Monthly Reports function and Apis
function getMonthDate() {
  var now = new Date();
  var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
  var prevMonthFirstDate = new Date(
    now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
    (now.getMonth() - 1 + 12) % 12,
    1
  );
  return {
    last_date: prevMonthLastDate,
    first_date: prevMonthFirstDate
  };
}
Route.get("/status_job_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  console.log(last_date);

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "job"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_good_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "good_lead"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_hot_lead_month_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "hot"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_closed_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "closed"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

Route.get("/status_rejected_lead_monthly_count", auth, async (req, res) => {
  const { first_date, last_date } = getMonthDate();

  try {
    const result = await Job.findAll({
      attributes: ["id"],

      where: {
        createdAt: {
          [Op.between]: [first_date, last_date] // BETWEEN 6 AND 10
        },
        status: "rejected"
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

// user daily job created
Route.get("/user_daily_job_created", auth, async (req, res) => {
  try {
    const result = await Job.findAll({
      where: {
        createdAt: new Date(),
        userId: req.user.user.id
      }
    });

    res.json({ result });
  } catch (error) {
    console.log(error.message);
    return res.status(402).json({ msg: "Server Error" });
  }
});

module.exports = Route;
