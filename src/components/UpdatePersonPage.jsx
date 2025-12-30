import { useState, useEffect } from "react";
import { getPersonById, updatePerson } from "../api/personService";
import { useParams, useNavigate } from "react-router-dom";
import "../PersonForm.css";

export default function UpdatePersonPage() {
    const { id } = useParams();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: ""
  });
  console.log(id, "iddd");
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHoverSubmit, setIsHoverSubmit] = useState(false);
  const [isHoverCancel, setIsHoverCancel] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    } else if (formData.name.length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }
    
    if (!formData.age) {
      newErrors.age = "L'âge est requis";
    } else if (isNaN(formData.age)) {
      newErrors.age = "L'âge doit être un nombre";
    } else if (parseInt(formData.age) < 0) {
      newErrors.age = "L'âge doit être positif";
    } else if (parseInt(formData.age) > 150) {
      newErrors.age = "L'âge doit être inférieur à 150";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

   useEffect(() => {
    if (id) {
      
    } 
  }, []);
    useEffect(() => {
    const loadPerson = async () => {
      try {
        if (id) {
          const data = await getPersonById(id);
          console.log(data, "testtt");
          
          setFormData({
        name: data.data.name || "",
        age: data.data.age || ""
      });
        }
      } catch (err) {
        console.error("Error loading person:", err);
      } 
    };

    loadPerson();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
    
        await updatePerson({
          id: id, 
          name: formData.name,
          age: formData.age
        });
      
      
      // Reset form and notify parent
      setFormData({ name: "", age: "" });

      alert("Utilisateur mis à jour avec succès!");
      
      // Navigate to /users after successful update
      navigate("/users");
      
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      
      // Handle API errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          submit: "Une erreur est survenue. Veuillez réessayer."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", age: "" });
    setErrors({});
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "person-form-input";
    const errorClass = errors[fieldName] ? "person-form-input-error" : "person-form-input-normal";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="person-form-container">
      {/* Header Card */}
      <div className="person-form-header">
        <div>
          <div className="person-form-header-icon">
            
              <svg className="person-form-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            
          
          </div>
          <div className="person-form-header-content">
            <h2 className="person-form-header-title">
              "Modifier la personne"
            </h2>
            <p className="person-form-header-subtitle">
              "Mettez à jour les informations de cette personne" 
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="person-form-card">
        {/* Form Status Indicator */}
        <div className="person-form-status">
          <div className="person-form-status-wrapper">
            <div className="person-form-status-indicator">
              <div className={`person-form-status-dot person-form-status-dot-edit`}></div>
              <span className="person-form-status-text">
             Mode édition
              </span>
            </div>
            
              <div className="person-form-id-badge">
                ID: <span className="person-form-id-value">{id}</span>
              </div>
          </div>
        </div>

        <div className="person-form-content">
          {/* Error Alert */}
          {errors.submit && (
            <div className="person-form-error-alert">
              <div className="person-form-error-wrapper">
                <div>
                  <svg className="person-form-error-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="person-form-error-message">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ margin: 0 }}>
            {/* Name Field */}
            <div className="person-form-group">
              <div className="person-form-label-container">
                <label htmlFor="name" className="person-form-label">
                  Nom complet
                </label>
                <span className="person-form-required">REQUIS</span>
              </div>
              <div className="person-form-input-wrapper">
                <div className="person-form-input-icon">
                  <svg className="person-form-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={getInputClassName('name')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && (
                <div className="person-form-field-error">
                  <svg className="person-form-btn-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Age Field */}
            <div className="person-form-group">
              <div className="person-form-label-container">
                <label htmlFor="age" className="person-form-label">
                  Âge
                </label>
                <span className="person-form-required">REQUIS</span>
              </div>
              <div className="person-form-input-wrapper">
                <div className="person-form-input-icon">
                  <svg className="person-form-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="0"
                  max="150"
                  className={getInputClassName('age')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.age && (
                <div className="person-form-field-error">
                  <svg className="person-form-btn-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.age}</span>
                </div>
              )}
              <p className="person-form-helper-text">
                Doit être un nombre compris entre 0 et 150
              </p>
            </div>

            {/* Form Actions */}
            <div className="person-form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setIsHoverSubmit(true)}
                onMouseLeave={() => setIsHoverSubmit(false)}
                className="person-form-submit-btn"
              >
                <div className="person-form-btn-content">
                  {isSubmitting ? (
                    <>
                      <svg className="person-form-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                       Mise à jour en cours...
                    </>
                  ) : (
                    <>
                      <svg className="person-form-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        
                      </svg>
                     Mettre à jour
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                onMouseEnter={() => setIsHoverCancel(true)}
                onMouseLeave={() => setIsHoverCancel(false)}
                className="person-form-cancel-btn"
              >
                <div className="person-form-btn-content">
                  <svg className="person-form-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    
                  </svg>
                  Annuler
                </div>
              </button>
            </div>

            {/* Form Footer */}
            <div className="person-form-footer">
              <div className="person-form-footer-badge">
                <div className="person-form-badge-item">
                  <div className="person-form-badge-dot person-form-badge-dot-required"></div>
                  <span>Tous les champs sont requis</span>
                </div>
                <div className="person-form-divider"></div>
                <div className="person-form-badge-item">
                  <div className="person-form-badge-dot person-form-badge-dot-validation"></div>
                  <span>Validation en temps réel</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Additional Info Panel */}
      {/* {selectedPerson && (
        <div className="person-form-info-panel">
          <div className="person-form-info-wrapper">
            <div className="person-form-info-icon-wrapper">
              <svg className="person-form-info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="person-form-info-content">
              <h3 className="person-form-info-title">
                Modification en cours
              </h3>
              <p className="person-form-info-text">
                Vous modifiez actuellement <span className="person-form-info-highlight">{selectedPerson.name}</span> (ID: {selectedPerson.id}).
                Toutes les modifications seront appliquées immédiatement.
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}