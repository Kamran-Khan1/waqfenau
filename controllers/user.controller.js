import db from "../db/db.js";

export const getAllData = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM waqfenau");
    if (data.rows[0]) {
      res.status(200).json(data.rows);
    } else {
      res.status(400).json({
        message: "No data existed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const getSpecificData = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const query = `SELECT * FROM waqfenau WHERE id = $1`;
    const values = [userId];
    const result = await db.query(query, values);
    if (result.rows[0]) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(400).json({
        meaasge: `User isn't exists`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const postData = async (req, res) => {
  try {
    const {
      wfnumber,
      name,
      fname,
      mname,
      jamat,
      mobile,
      dob,
      halka,
      study,
      work,
      quran,
      letter,
      syllabus,
      joccations,
      jpost,
      comment,
    } = req.body;

    const values = [
      wfnumber,
      name,
      fname,
      mname,
      jamat,
      mobile,
      dob,
      halka,
      study,
      work,
      quran,
      letter,
      syllabus,
      joccations,
      jpost,
      comment,
    ];
    const query = `INSERT INTO waqfenau(wfnumber, name, fname, mname, jamat, mobile, dob, halka, study, work, quran, letter, syllabus, joccations, jpost, comment) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`;
    const data = await db.query(query, values);
    res.status(200).json({
      message: `Data posted Successfully`,
      postedData: data.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const updateData = async (req, res) => {
  const {
    wfnumber,
    name,
    fname,
    mname,
    jamat,
    mobile,
    dob,
    halka,
    study,
    work,
    quran,
    letter,
    syllabus,
    joccations,
    jpost,
    comment,
  } = req.body;
  try {
    const userId = parseInt(req.params.id);
    const oldData = await db.query("SELECT * FROM waqfenau WHERE id = $1", [
      userId,
    ]);

    if (oldData.rows[0]) {
      const updatedValues = [
        wfnumber || oldData.rows[0].wfnumber,
        name || oldData.rows[0].name,
        fname || oldData.rows[0].fname,
        mname || oldData.rows[0].mname,
        jamat || oldData.rows[0].jamat,
        mobile || oldData.rows[0].mobile,
        dob || oldData.rows[0].dob,
        halka || oldData.rows[0].halka,
        study || oldData.rows[0].study,
        work || oldData.rows[0].work,
        quran || oldData.rows[0].quran,
        letter || oldData.rows[0].letter,
        syllabus || oldData.rows[0].syllabus,
        joccations || oldData.rows[0].joccations,
        jpost || oldData.rows[0].jpost,
        comment || oldData.rows[0].comment,
        userId,
      ];

      const query = `UPDATE waqfenau
            SET wfnumber = $1, name = $2, fname = $3, mname = $4, jamat= $5, mobile= $6, dob= $7, halka= $8, study= $9, work= $10, quran= $11, letter= $12, syllabus= $13, joccations= $14, jpost= $15, comment= $16
            WHERE id = $17 RETURNING *`;
      const result = await db.query(query, updatedValues);

      res.status(200).json({
        message: `Data Updated successfully`,
        updatedData: result.rows[0],
      });
    } else {
      res.status(400).json({
        message: `User isn't exists`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const deleteData = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const query = `DELETE FROM waqfenau where id = $1 RETURNING *`;
    const values = [userId];

    const result = await db.query(query, values);

    if (result.rows[0]) {
      res.status(200).json({
        message: `Data deleted successfully`,
      });
    } else {
      res.status(400).json({
        message: `User isn't exists`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};
