import React, { useState } from "react";
import "./style.css";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MoneyIcon from "@mui/icons-material/Money";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../FirebaseContext";
import { Alert, AlertTitle } from "@mui/material";

const CourseCreation = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [formData, setFormData] = useState({
    basicInfo: {
      courseTitle: "",
      courseCode: "",
      courseDescription: "",
      courseCategory: "",
      courseLevel: "",
      courseDuration: "",
      languageOfInstruction: "",
      courseImage: null,
      instructorName: "",
      instructorBio: "",
      instructorContact: "",
    },
    additionalInfo: {
      courseObjectives: "",
      prerequisites: "",
      learningOutcomes: "",
      targetAudience: "",
      teachingMethodology: "",
      requiredMaterials: "",
      assessmentMethods: "",
      certification: "",
    },
    eligibilitySyllabus: {
      eligibilityCriteria: "",
      syllabus: "",
      moduleName: "",
      moduleDescription: "",
      subtopics: "",
      readingMaterials: "",
      weeklySchedule: "",
    },
    feeScholarship: {
      courseFee: "",
      paymentMethods: "",
      scholarshipOptions: "",
      refundPolicy: "",
      earlyBirdDiscounts: "",
      additionalCosts: "",
    },
  });

  const handleNext = () => {
    const requiredFields = document.querySelectorAll(".form-input[required]");
    let hasEmptyRequiredFields = false;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        hasEmptyRequiredFields = true;
      }
    });

    if (hasEmptyRequiredFields) {
      setError("Please fill in all required fields before proceeding.");
    } else if (currentSection < 4) {
      setError(""); 
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const initialBasicInfoState = {
    courseTitle: "",
    courseCode: "",
    courseDescription: "",
    courseCategory: "",
    courseLevel: "",
    courseDuration: "",
    languageOfInstruction: "",
    courseImage: null,
    instructorName: "",
    instructorBio: "",
    instructorContact: "",
  };

  const initialAdditionalInfoState = {
    courseObjectives: "",
    prerequisites: "",
    learningOutcomes: "",
    targetAudience: "",
    teachingMethodology: "",
    requiredMaterials: "",
    assessmentMethods: "",
    certification: "",
  };

  const initialEligibilitySyllabusState = {
    eligibilityCriteria: "",
    syllabus: "",
    moduleName: "",
    moduleDescription: "",
    subtopics: "",
    readingMaterials: "",
    weeklySchedule: "",
  };

  const initialFeeScholarshipState = {
    courseFee: "",
    paymentMethods: "",
    scholarshipOptions: "",
    refundPolicy: "",
    earlyBirdDiscounts: "",
    additionalCosts: "",
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const courseRef = collection(db, "courses");
        const formDataToSend = {
          basicInfo: formData.basicInfo,
          additionalInfo: formData.additionalInfo,
          eligibilitySyllabus: formData.eligibilitySyllabus,
          feeScholarship: formData.feeScholarship,
        };

        await addDoc(courseRef, {
          userId: userId, 
          formData: formDataToSend,
          createdAt: serverTimestamp(), 
        });

        setFormData({
          basicInfo: { ...initialBasicInfoState },
          additionalInfo: { ...initialAdditionalInfoState },
          eligibilitySyllabus: { ...initialEligibilitySyllabusState },
          feeScholarship: { ...initialFeeScholarshipState },
        });
        setError("");
        setCurrentSection(1);

        setSuccessMessage("Course created successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
         <p>user is not logged In</p>
      }
    } catch (error) {
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="course-creation">
      <h2 style={{ textAlign: "left" }}>Course Creation</h2>
      <div className="stepper">
        <div>
          <div
            className={`step ${
              currentSection >= 1 ? "completed basic-info" : ""
            } ${currentSection === 1 ? "active" : ""}`}
          >
            <ArticleIcon />
          </div>
          <p>Basic Information</p>
        </div>
        <div>
          <div
            className={`step ${
              currentSection >= 2 ? "completed additional-info" : ""
            } ${currentSection === 2 ? "active" : ""}`}
          >
            <DescriptionIcon />
          </div>
          <p>Additional Information</p>
        </div>
        <div>
          <div
            className={`step ${
              currentSection >= 3 ? "completed eligibility-syllabus" : ""
            } ${currentSection === 3 ? "active" : ""}`}
          >
            <EmojiEventsIcon />
          </div>
          <p>Eligibility & Syllabus</p>
        </div>
        <div>
          <div
            className={`step ${
              currentSection >= 4 ? "completed fee-scholarship" : ""
            } ${currentSection === 4 ? "active" : ""}`}
          >
            <MoneyIcon />
          </div>
          <p>Fee & Scholarship</p>
        </div>
      </div>

      {successMessage && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

      {currentSection === 1 && (
        <div className="section">
          <h3>Basic Information</h3>
          <form>
            <div className="form-div">
              <label className="form-label">
                <p>
                  {" "}
                  Course Title <span className="required-marker">*</span>:{" "}
                </p>
                <input
                  className="form-input"
                  type="text"
                  value={formData.basicInfo.courseTitle}
                  required
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "courseTitle",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                <p>
                  {" "}
                  Course Code (if applicable){" "}
                  <span className="required-marker">*</span>:
                </p>
                <input
                  className="form-input"
                  required
                  type="text"
                  value={formData.basicInfo.courseCode}
                  onChange={(e) =>
                    handleInputChange("basicInfo", "courseCode", e.target.value)
                  }
                />
              </label>
              <label className="form-label">
                Course Description:
                <textarea
                  className="form-input"
                  value={formData.basicInfo.courseDescription}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "courseDescription",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                <p>
                  Course Category/Subject{" "}
                  <span className="required-marker">*</span>:
                </p>
                <input
                  className="form-input"
                  required
                  type="text"
                  value={formData.basicInfo.courseCategory}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "courseCategory",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Course Level:
                <input
                  className="form-input"
                  type="text"
                  value={formData.basicInfo.courseLevel}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "courseLevel",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                <p>
                  Course Duration (weeks or months)
                  <span className="required-marker">*</span>:
                </p>
                <input
                  className="form-input"
                  type="text"
                  value={formData.basicInfo.courseDuration}
                  required
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "courseDuration",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Language of Instruction:
                <input
                  className="form-input"
                  type="text"
                  value={formData.basicInfo.languageOfInstruction}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "languageOfInstruction",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Course Image/Logo:
                <input
                  className="form-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "courseImage",
                      e.target.files[0]
                    )
                  }
                />
              </label>
              <label className="form-label">
                Instructor Name:
                <input
                  className="form-input"
                  type="text"
                  value={formData.basicInfo.instructorName}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "instructorName",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Instructor Bio/Description:
                <textarea
                  className="form-input"
                  value={formData.basicInfo.instructorBio}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "instructorBio",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Instructor Contact Information:
                <input
                  className="form-input"
                  type="text"
                  value={formData.basicInfo.instructorContact}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "instructorContact",
                      e.target.value
                    )
                  }
                />
              </label>
            </div>
          </form>
        </div>
      )}

      {/* Additional Information Section */}
      {currentSection === 2 && (
        <div className="section">
          <h3>Additional Information</h3>
          <form>
            <div className="form-div">
              <label className="form-label">
                <p>
                  Course Objectives/Goals{" "}
                  <span className="required-marker">*</span>:
                </p>
                <textarea
                  className="form-input"
                  required
                  value={formData.additionalInfo.courseObjectives}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "courseObjectives",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Prerequisites (if any):
                <textarea
                  className="form-input"
                  value={formData.additionalInfo.prerequisites}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "prerequisites",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Learning Outcomes:
                <textarea
                  className="form-input"
                  value={formData.additionalInfo.learningOutcomes}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "learningOutcomes",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Target Audience:
                <input
                  className="form-input"
                  type="text"
                  value={formData.additionalInfo.targetAudience}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "targetAudience",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Teaching Methodology:
                <textarea
                  className="form-input"
                  value={formData.additionalInfo.teachingMethodology}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "teachingMethodology",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Required Materials/Resources:
                <textarea
                  className="form-input"
                  value={formData.additionalInfo.requiredMaterials}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "requiredMaterials",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Assessment Methods:
                <textarea
                  className="form-input"
                  value={formData.additionalInfo.assessmentMethods}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "assessmentMethods",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Certification:
                <input
                  className="form-input"
                  type="text"
                  value={formData.additionalInfo.certification}
                  onChange={(e) =>
                    handleInputChange(
                      "additionalInfo",
                      "certification",
                      e.target.value
                    )
                  }
                />
              </label>
            </div>
          </form>
        </div>
      )}

      {/* Eligibility & Syllabus Section */}
      {currentSection === 3 && (
        <div className="section">
          <h3>Eligibility & Syllabus</h3>
          <form>
            <div className="form-div">
              <label className="form-label">
                <p>
                  {" "}
                  Eligibility Criteria (if any){" "}
                  <span className="required-marker">*</span>:
                </p>
                <textarea
                  className="form-input"
                  value={formData.eligibilitySyllabus.eligibilityCriteria}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "eligibilityCriteria",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Syllabus/Topics Covered:
                <textarea
                  className="form-input"
                  value={formData.eligibilitySyllabus.syllabus}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "syllabus",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Module/Unit Name:
                <input
                  className="form-input"
                  type="text"
                  value={formData.eligibilitySyllabus.moduleName}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "moduleName",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Module Description:
                <textarea
                  className="form-input"
                  value={formData.eligibilitySyllabus.moduleDescription}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "moduleDescription",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Subtopics/Sections:
                <textarea
                  className="form-input"
                  value={formData.eligibilitySyllabus.subtopics}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "subtopics",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Reading/Reference Materials:
                <textarea
                  className="form-input"
                  value={formData.eligibilitySyllabus.readingMaterials}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "readingMaterials",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Weekly Schedule/Outline (if applicable):
                <textarea
                  className="form-input"
                  value={formData.eligibilitySyllabus.weeklySchedule}
                  onChange={(e) =>
                    handleInputChange(
                      "eligibilitySyllabus",
                      "weeklySchedule",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
            </div>
          </form>
        </div>
      )}

      {/* Fee & Scholarship Section */}
      {currentSection === 4 && (
        <div className="section">
          <h3>Fee & Scholarship</h3>
          <form>
            <div className="form-div">
              <label className="form-label">
                Course Fee:
                <input
                  className="form-input"
                  type="text"
                  value={formData.feeScholarship.courseFee}
                  onChange={(e) =>
                    handleInputChange(
                      "feeScholarship",
                      "courseFee",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Payment Methods (e.g., Credit Card, PayPal, Bank Transfer):
                <textarea
                  className="form-input"
                  value={formData.feeScholarship.paymentMethods}
                  onChange={(e) =>
                    handleInputChange(
                      "feeScholarship",
                      "paymentMethods",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Scholarship/Financial Aid Options:
                <textarea
                  className="form-input"
                  value={formData.feeScholarship.scholarshipOptions}
                  onChange={(e) =>
                    handleInputChange(
                      "feeScholarship",
                      "scholarshipOptions",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Refund Policy:
                <textarea
                  className="form-input"
                  value={formData.feeScholarship.refundPolicy}
                  onChange={(e) =>
                    handleInputChange(
                      "feeScholarship",
                      "refundPolicy",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
              <label className="form-label">
                Early Bird Discounts (if any):
                <input
                  className="form-input"
                  type="text"
                  value={formData.feeScholarship.earlyBirdDiscounts}
                  onChange={(e) =>
                    handleInputChange(
                      "feeScholarship",
                      "earlyBirdDiscounts",
                      e.target.value
                    )
                  }
                />
              </label>
              <label className="form-label">
                Additional Costs (e.g., Materials, Lab Fees):
                <textarea
                  className="form-input"
                  value={formData.feeScholarship.additionalCosts}
                  onChange={(e) =>
                    handleInputChange(
                      "feeScholarship",
                      "additionalCosts",
                      e.target.value
                    )
                  }
                ></textarea>
              </label>
            </div>
          </form>
        </div>
      )}

      <div className="buttons">
        {currentSection > 1 && (
          <button className="button" onClick={handlePrevious}>
            Previous
          </button>
        )}
        {currentSection < 4 ? (
          <button className="button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CourseCreation;
