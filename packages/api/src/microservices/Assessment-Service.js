const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {

  try {

    const assessmentObj = {
      catDateOfBirth: assessment.assessment.catDateOfBirth,
      catName: assessment.assessment.catName,
      createdAt: assessment.assessment.createdAt,
      instrumentType: assessment.assessment.instrumentType,
      riskLevel: assessment.assessment.riskLevel,
      score: assessment.assessment.score,
    };

    const newAssessment = await Assessment.create(assessmentObj);
    console.log(`Assessment saved successfully:`, newAssessment.toJSON());
  } catch (error) {
    console.error(`Error saving assessment:`, error);
    throw error;
  }
};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  try {

    return await Assessment.findAll();
  } catch (error) {
    console.error(`Error fetching assessments:`, error);
    throw error;
  }
};
exports.delete = async (assessmentId) => {
  try {
    // find the assessment by its id and soft delete it
    const assessment = await Assessment.findByPk(assessmentId);
    await assessment.destroy();
    console.log(`Assessment with id ${assessmentId} has been soft deleted`);
  } catch (error) {
    console.error(`Error deleting assessment:`, error);
    throw error;
  }
};
