import { React, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
export const NewAssessment = () => {

  const { formState: { errors }, handleSubmit, register, reset } = useForm();
  const [ score, setScore ] = useState(0);
  const [ riskLevel, setRiskLevel ] = useState(`low`);

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const onSubmit = async (data) => {
    console.log(data.previousContact);
    const newScore =
    parseInt(data.previousContact) +
    parseInt(data.altercations) +
    parseInt(data.ownerAltercations) +
    parseInt(data.playWithDogs) +
    parseInt(data.hissesAtStrangers);
    setScore(newScore);

    if (newScore >= 4) {
      setRiskLevel(`high`);
    } else if (newScore >= 2) {
      setRiskLevel(`medium`);
    } else {
      setRiskLevel(`low`);
    }

    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    const created = new Date(now.getTime() - timezoneOffset * 60 * 1000);

    const assessmentData = {
      catDateOfBirth: data.catDateOfBirth,
      catName: data.catName,
      created,
      instrumentType: `Cat Behavioral Instrument`,
      riskLevel,
      score: newScore,
    };

    console.log(`Assessment Data: `, assessmentData);

    await AssessmentService.submit(assessmentData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="catName" className="form-label">
          Cat Name
        </label>
        <input
          type="text"
          className="form-control"
          id="catName"
          {...register(`catName`, { required: true })}
        />
        {errors.catName && <span className="text-danger">This field is required</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="catDateOfBirth" className="form-label">
          Cat Date of Birth
        </label>
        <input
          type="date"
          className="form-control"
          id="catDateOfBirth"
          {...register(`catDateOfBirth`, { required: true })}
        />
        {errors.dateOfBirth && <span className="text-danger">This field is required</span>}
      </div>

      <div className="mb-3">
        <p> Previous contact with the Cat Judicial System:</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="previousContact"
            id="previousContactNo" value="0" {...register(`previousContact`, { required: true })} />
          <label className="form-check-label" htmlFor="previousContactNo">
            No
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="previousContact"
            id="previousContactYes" value="1" {...register(`previousContact`, { required: true })} />
          <label className="form-check-label" htmlFor="previousContactYes">
            Yes
          </label>
        </div>
        {errors.previousContact && <span className="text-danger">This field is required</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="altercations" className="form-label">
          Physical altercations with other cats
        </label>
        <select className="form-select" id="altercations" {...register(`altercations`, { required: true })}>
          <option value="0">0-3 altercations</option>
          <option value="1">3+ altercations</option>
        </select>
        {errors.altercations && <span className="text-danger">This field is required</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="ownerAltercations" className="form-label">
          Physical altercations with owner (scratching, biting, etc...)
        </label>
        <select className="form-select" id="ownerAltercations" {...register(`ownerAltercations`, { required: true })}>
          <option value="0">0-10 altercations</option>
          <option value="1">10+ altercations</option>
        </select>
        {errors.ownerAltercations && <span className="text-danger">This field is required</span>}
      </div>

      <div className="mb-3">
        <p>Plays well with dogs:</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="playWithDogs"
            id="playWithDogsNo" value="1" {...register(`playWithDogs`, { required: true })} />
          <label className="form-check-label" htmlFor="playWithDogsNo">
            No
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="playWithDogs"
            id="playWithDogsYes" value="0" {...register(`playWithDogs`, { required: true })} />
          <label className="form-check-label" htmlFor="playWithDogsYes">
            Yes
          </label>
        </div>
        {errors.playWithDogs && <span className="text-danger">This field is required</span>}
      </div>

      <div className="mb-3">
        <p>Hisses at strangers:</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="hissesAtStrangers"
            id="hissesAtStrangers" value="1" {...register(`hissesAtStrangers`, { required: true })} />
          <label className="form-check-label" htmlFor="hissesAtStrangers">
            No
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="hissesAtStrangers"
            id="hissesAtStrangers" value="0" {...register(`hissesAtStrangers`, { required: true })} />
          <label className="form-check-label" htmlFor="hissesAtStrangers">
            Yes
          </label>
        </div>
        {errors.hissesAtStrangers && <span className="text-danger">This field is required</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <div className="mt-3">
        <h5>Assessment Result</h5>
        <p>Score: {score}</p>
        <p>Risk Level: {riskLevel}</p>
      </div>
    </form>
  );
};
