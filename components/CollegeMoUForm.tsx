"use client";

import { useState } from "react";

interface FormData {
  collegeName: string;
  collegeAddress: string;
  cityState: string;
  website: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  mouInterest: string;
  domains: string[];
  studentsCount: string;
  mode: string;
  tpoCell: string;
  workshops: string;
  draftMou: string;
  comments: string;
  confirmation: boolean;
}

interface CollegeMoUFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollegeMoUForm({ isOpen, onClose }: CollegeMoUFormProps) {
  const [formData, setFormData] = useState<FormData>({
    collegeName: "",
    collegeAddress: "",
    cityState: "",
    website: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    mouInterest: "",
    domains: [],
    studentsCount: "",
    mode: "",
    tpoCell: "",
    workshops: "",
    draftMou: "",
    comments: "",
    confirmation: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === "checkbox" && name === "domains") {
      setFormData((prev) => ({
        ...prev,
        domains: checked
          ? [...prev.domains, value]
          : prev.domains.filter((d) => d !== value),
      }));
    } else if (type === "checkbox" && name === "confirmation") {
      setFormData((prev) => ({ ...prev, confirmation: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.confirmation) {
      alert("Please confirm before submitting.");
      return;
    }

    try {
      const res = await fetch("/api/submit-mou", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        // 🧹 Clear form fields
        setFormData({
          collegeName: "",
          collegeAddress: "",
          cityState: "",
          website: "",
          contactName: "",
          designation: "",
          email: "",
          phone: "",
          mouInterest: "",
          domains: [],
          studentsCount: "",
          mode: "",
          tpoCell: "",
          workshops: "",
          draftMou: "",
          comments: "",
          confirmation: false,
        });
        onClose();
      } else alert("Error submitting form");
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  const domainOptions = [
    "Web Development",
    "Python with Machine Learning",
    "Python with Data Science",
    "Python Full Stack",
    "Artificial Intelligence",
    "Android Development",
    "Cloud Computing (Azure, AWS)",
    "Cyber Security with Ethical Hacking",
    "UI/UX",
    "Blockchain/Bitcoin",
    "Meta Verse",
    "AR/VR",
    "Data Analytics",
    "VLSI",
    "Robotics and IoT",
    "Embedded Systems",
    "Drone Technology",
    "Hybrid Electric Vehicles",
    "Internet of Things(IoT)",
    "Car Design",
    "Solid Edge 2D / 3D",
    "AutoCAD",
    "3Ds Max",
    "Photoshop",
    "Construction Planning and Management",
    "Revit",
    "Sketch UP",
    "V Ray",
    "Finance",
    "Investment Banking with Finance",
    "Digital Marketing",
    "Marketing Management",
    "Social Media Marketing",
    "Human Resource",
    "Entrepreneurship",
    "Stock Market",
    "Graphic Designing",
    "Genetic Engineering",
    "Molecular Biology",
    "Microbiology",
    "Bioinformatics",
    "Bio Statistics",
    "Nano Technology",
    "Medical Coding",
    "Web 3.0",
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Form Content */}
        <div className="overflow-y-auto max-h-[90vh] px-8 pb-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2 pt-4">
              College MoU Collaboration Form
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Please fill out the details below. Fields marked with{" "}
              <span className="text-red-600">*</span> are mandatory.
            </p>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} required />
            <Input label="College Address" name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} required />
            <Input label="City / State" name="cityState" value={formData.cityState} onChange={handleChange} required />
            <Input label="College Website (if available)" name="website" value={formData.website} onChange={handleChange} required={false} />
            <Input label="Point of Contact (Principal / TPO / HoD / Faculty)" name="contactName" value={formData.contactName} onChange={handleChange} required />
            <Input label="Designation / Department" name="designation" value={formData.designation} onChange={handleChange} required />
            <Input label="Official Email ID" name="email" value={formData.email} onChange={handleChange} required type="email" />
            <Input label="Contact Number" name="phone" value={formData.phone} onChange={handleChange} required type="tel" />
          </div>

          {/* MoU Interest */}
          <Select
          label="Is your college interested in signing an MoU with Edunutshell?"
          name="mouInterest"
          value={formData.mouInterest}
          onChange={handleChange}
          options={[
            "Yes, we are ready to collaborate",
            "Only Branch / Department is Interested",
            "Interested, need more details",
            "Not at the moment",
          ]}
            required
          />

          {/* Domains - FIXED SECTION */}
          <div>
            <label className="block font-semibold mb-2">
              Which domains would your students be most interested in?{" "}
              <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto border rounded-xl p-4 bg-gray-50">
              {domainOptions.map((d) => (
                <label
                  key={d}
                  className="flex items-start space-x-2 cursor-pointer text-sm break-words"
                >
                  <input
                    type="checkbox"
                    name="domains"
                    value={d}
                    checked={formData.domains.includes(d)}
                    onChange={handleChange}
                    className="mt-1 accent-blue-600 shrink-0"
                  />
                  <span className="flex-1 leading-snug">{d}</span>
                </label>
              ))}
            </div>
          </div>

          <Select
          label="Approximate number of students who may participate / benefit"
          name="studentsCount"
          value={formData.studentsCount}
          onChange={handleChange}
          options={["01–50", "50–100", "100–200", "200–500", "500+"]}
            required
          />

          <Select
            label="Preferred Mode of Assessment"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            options={["Virtual (Online)", "Hybrid (Online + Campus Sessions)"]}
            required
          />

          <Select
            label="Does your college have a Training & Placement Cell?"
            name="tpoCell"
            value={formData.tpoCell}
            onChange={handleChange}
            options={["Yes", "No", "In progress"]}
            required
          />

          <Select
            label="Would your college be open to hosting Edunutshell Workshops / Seminars?"
            name="workshops"
            value={formData.workshops}
            onChange={handleChange}
            options={["Yes, we'd love to", "Possibly, in the next semester", "Not currently"]}
            required
          />

          <Select
            label="Would you like to receive an official draft MoU and proposal document?"
            name="draftMou"
            value={formData.draftMou}
            onChange={handleChange}
            options={["Yes", "No"]}
            required
          />

          <TextArea
            label="Any specific expectations or comments regarding this collaboration?"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />

          <label className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border">
            <input
              type="checkbox"
              name="confirmation"
              checked={formData.confirmation}
              onChange={handleChange}
              required
              className="mt-1 accent-blue-600"
            />
            <span className="text-sm">
              I acknowledge that the details provided above are true and express our interest in exploring an MoU collaboration with Edunutshell.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300"
          >
            Submit Form
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

/* ---- Reusable Components ---- */
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

function Input({ label, name, value, onChange, type = "text", required = false }: InputProps) {
  return (
    <div>
      <label className="block font-semibold mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

function Select({ label, name, value, onChange, options, required = false }: SelectProps) {
  return (
    <div>
      <label className="block font-semibold mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ label, name, value, onChange }: TextAreaProps) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
}
