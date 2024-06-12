import { useState, useEffect } from "react";
import "./styles/App.css";
import PersonalDetails from "./components/personal-info/PersonalDetails";
import AddEducationSection from "./components/education/AddEducationSection";
import AddExperienceSection from "./components/experience/AddExperienceSection";
import Resume from "./components/Resume";
import uniqid from "uniqid";
import TemplateLoader from "./components/TemplateLoader";
import exampleData from "./example-data";
import Sidebar from "./components/Sidebar";
import Customize from "./components/Customize";
import html2pdf from "html2pdf.js"; // Import html2pdf library
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  const [personalInfo, setPersonalInfo] = useState({
    ...exampleData.personalInfo,
    photo: exampleData.personalInfo.photo,
  });
  const [sections, setSections] = useState(exampleData.sections);
  const [sectionOpen, setSectionOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState("content");
  const [resumeLayout, setResumeLayout] = useState("top");
  const [prevState, setPrevState] = useState(null);

  function handlePersonalInfoChange(e) {
    const { key } = e.target.dataset;
    setPersonalInfo({ ...personalInfo, [key]: e.target.value });
  }
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Convert the image to Data URL
          const canvas = document.createElement("canvas");
          const maxSize = 1024; // Max size in pixels
  
          let width = img.width;
          let height = img.height;
  
          // Resize the image if it's too large
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height *= maxSize / width;
              width = maxSize;
            } else {
              width *= maxSize / height;
              height = maxSize;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert the canvas to Data URL
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG for better compression
          setPersonalInfo((prevInfo) => ({ ...prevInfo, photo: dataUrl }));
        };
      };
      reader.readAsDataURL(file);
    }
  }
  

  function handleSectionChange(e) {
    const { key } = e.target.dataset;
    const inputValue = e.target.value;
    const form = e.target.closest(".section-form");
    const { id } = form;
    const { arrayName } = form.dataset;
    const section = sections[arrayName];
    setSections({
      ...sections,
      [arrayName]: section.map((obj) => {
        if (obj.id === id) obj[key] = inputValue;
        return obj;
      }),
    });
  }

  function createForm(arrayName, object) {
    setPrevState(null);
    const section = structuredClone(sections[arrayName]);
    section.push(object);
    setSections({ ...sections, [arrayName]: section });
  }

  const createEducationForm = () =>
    createForm("educations", {
      degree: "",
      schoolName: "",
      location: "",
      startDate: "",
      endDate: "",
      isCollapsed: false,
      isHidden: false,
      id: uniqid(),
    });

  const createExperienceForm = () =>
    createForm("experiences", {
      companyName: "",
      positionTitle: "",
      location: "",
      description: "",
      startDate: "",
      endDate: "",
      isCollapsed: false,
      isHidden: false,
      id: uniqid(),
    });

  const setOpen = (sectionName) => setSectionOpen(sectionName);
  function removeForm(e) {
    const form = e.target.closest(".section-form");
    const { arrayName } = form.dataset;
    const section = sections[arrayName];
    const { id } = form;

    setSections({
      ...sections,
      [arrayName]: section.filter((item) => item.id !== id),
    });
  }

  function cancelForm(e) {
    if (prevState == null) {
      removeForm(e);
      return;
    }

    const sectionForm = e.target.closest(".section-form");
    const { id } = sectionForm;
    const { arrayName } = sectionForm.dataset;
    const section = sections[arrayName];

    setSections({
      ...sections,
      [arrayName]: section.map((form) => {
        if (form.id === id) {
          form = prevState;
          form.isCollapsed = true;
        }
        return form;
      }),
    });
  }

  function toggleValue(e, key) {
    const sectionForm = e.target.closest(".section-form");
    const { id } = sectionForm;
    const { arrayName } = sectionForm.dataset;
    const section = sections[arrayName];
    setSections({
      ...sections,
      [arrayName]: section.map((form) => {
        if (form.id === id) {
          setPrevState(Object.assign({}, form));
          form[key] = !form[key];
        }
        return form;
      }),
    });
  }

  const toggleCollapsed = (e) => toggleValue(e, "isCollapsed");
  const toggleHidden = (e) => toggleValue(e, "isHidden");

  const downloadPDF = () => {
    const element = document.querySelector(".downl");

    html2pdf(element, {
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
  };

  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="app flex flex-col md:flex-row">
      <div className="edit-side mt-24 md:w-1/3">
        <Sidebar onGoToPage={setCurrentPage} page={currentPage} />
        <div className="form-container">
          <TemplateLoader
            onTemplateLoad={() => {
              setPersonalInfo(exampleData.personalInfo);
              setSections(exampleData.sections);
            }}
            onClear={() => {
              setPersonalInfo({
                fullName: "",
                email: "",
                phoneNumber: "",
                address: "",
                photo: "", // Reset photo
              });
              setSections({ educations: [], experiences: [] });
              setPrevState(null);
            }}
          />
          {currentPage === "content" && (
            <>
              <PersonalDetails
                onChange={handlePersonalInfoChange}
                onPhotoChange={handlePhotoChange} // Pass the photo change handler
                fullName={personalInfo.fullName}
                email={personalInfo.email}
                phoneNumber={personalInfo.phoneNumber}
                address={personalInfo.address}
                photo={personalInfo.photo}
              />

              <AddEducationSection
                educations={sections.educations}
                isOpen={sectionOpen === "Education"}
                onChange={handleSectionChange}
                createForm={createEducationForm}
                setOpen={setOpen}
                onCancel={cancelForm}
                toggleCollapsed={toggleCollapsed}
                onHide={toggleHidden}
                onRemove={removeForm}
              />
              <AddExperienceSection
                experiences={sections.experiences}
                isOpen={sectionOpen === "Experience"}
                onChange={handleSectionChange}
                createForm={createExperienceForm}
                setOpen={setOpen}
                onCancel={cancelForm}
                toggleCollapsed={toggleCollapsed}
                onHide={toggleHidden}
                onRemove={removeForm}
              />
            </>
          )}

          <Customize
            isShown={currentPage === "customize"}
            onColChange={setResumeLayout}
          />
        </div>
        <button className="btn bg-primary hover:bg-light text-white text-sm whitespace-nowrap py-2 px-4 ml-32 md:ml-32 rounded-2xl md:static mt-4 md:mt-0" onClick={downloadPDF}>Download as PDF</button>
      </div>
      <div className="downl mt-4 md:mt-24 md:mb-24 md:w-2/3">
        <Resume personalInfo={personalInfo} sections={sections} layout={resumeLayout} />
      </div>
    </div>
  );
}

export default App;
