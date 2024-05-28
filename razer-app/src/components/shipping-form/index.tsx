import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import LocationService, {
  Province,
  Canton,
  District,
} from "../../services/location-service";
import { ShippingData } from "../../models/shipping";

import "./shipping-form.scss";

interface ShippingFormProps {
  onNext: (data: ShippingData) => void;
}

interface Errors {
  address1?: string;
  province?: string;
  canton?: string;
  district?: string;
  zipCode?: string;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onNext }) => {
  const [provinces, setProvinces] = useState<Province>({});
  const [cantons, setCantons] = useState<Canton>({});
  const [districts, setDistricts] = useState<District>({});
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCanton, setSelectedCanton] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const fetchedProvinces = await LocationService.getProvinces();
        setProvinces(fetchedProvinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleAddress1Change = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress1(e.target.value);
  };

  const handleAddress2Change = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.target.value);
  };

  const handleProvinceChange = async (e: ChangeEvent<{ value: string }>) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    try {
      const fetchedCantons = await LocationService.getCantonsByProvince(
        provinceCode
      );
      setCantons(fetchedCantons);
    } catch (error) {
      console.error("Error fetching cantons:", error);
    }
  };

  const handleCantonChange = async (e: ChangeEvent<{ value: string }>) => {
    const cantonCode = e.target.value;
    setSelectedCanton(cantonCode);
    try {
      const fetchedDistricts = await LocationService.getDistrictsByCanton(
        selectedProvince,
        cantonCode
      );
      setDistricts(fetchedDistricts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = (e: ChangeEvent<{ value: string }>) => {
    setSelectedDistrict(e.target.value);
  };

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/\D/g, "");
    setZipCode(zip.substring(0, 5));
  };

  const handleSubmit = async () => {
    const newErrors: Errors = {};
    if (!address1) newErrors.address1 = "Please enter an address.";
    if (!selectedProvince) newErrors.province = "Please select a province.";
    if (!selectedCanton) newErrors.canton = "Please select a canton.";
    if (!selectedDistrict) newErrors.district = "Please select a district.";
    if (!zipCode) newErrors.zipCode = "Please enter a zip code.";

    if (!zipCode || zipCode.length < 5) {
      newErrors.zipCode = "Please enter a valid zip code.";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        // Crear un objeto para creditCard, aunque esté vacío
        const shippingData: ShippingData = {
          address: address1,
          address2,
          province: selectedProvince,
          canton: selectedCanton,
          district: selectedDistrict,
          zipCode: parseInt(zipCode),
        };
        onNext(shippingData);
        setErrors({});
      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Form className="shipping-form">
      <Form.Group controlId="formAddress1">
        <Form.Label>Address 1 *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          value={address1}
          onChange={handleAddress1Change}
          className={`shipping-form__input ${errors.address1 ? "error" : ""}`}
        />
        {errors.address1 && (
          <Form.Text className="error-message">{errors.address1}</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="formAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          value={address2}
          onChange={handleAddress2Change}
          className="shipping-form__input"
        />
      </Form.Group>
      <Form.Group controlId="formProvince">
        <Form.Label>Province *</Form.Label>
        <Form.Control
          as="select"
          value={selectedProvince}
          onChange={handleProvinceChange}
          className={`shipping-form__input ${errors.province ? "error" : ""}`}
        >
          <option value="">Choose...</option>
          {Object.entries(provinces).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </Form.Control>
        {errors.province && (
          <Form.Text className="error-message">{errors.province}</Form.Text>
        )}
      </Form.Group>
      {selectedProvince && (
        <Form.Group controlId="formCanton">
          <Form.Label>Canton *</Form.Label>
          <Form.Control
            as="select"
            value={selectedCanton}
            onChange={handleCantonChange}
            className={`shipping-form__input ${errors.canton ? "error" : ""}`}
          >
            <option value="">Choose...</option>
            {Object.entries(cantons).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Form.Control>
          {errors.canton && (
            <Form.Text className="error-message">{errors.canton}</Form.Text>
          )}
        </Form.Group>
      )}
      {selectedCanton && (
        <Form.Group controlId="formDistrict">
          <Form.Label>District *</Form.Label>
          <Form.Control
            as="select"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className={`shipping-form__input ${errors.district ? "error" : ""}`}
          >
            <option value="">Choose...</option>
            {Object.entries(districts).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Form.Control>
          {errors.district && (
            <Form.Text className="error-message">{errors.district}</Form.Text>
          )}
        </Form.Group>
      )}
      <Form.Group controlId="formZipCode">
        <Form.Label>Zip Code *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={handleZipCodeChange}
          className={`shipping-form__input ${errors.zipCode ? "error" : ""}`}
          maxLength={5}
        />
        {errors.zipCode && (
          <Form.Text className="error-message">{errors.zipCode}</Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        SUBMIT
      </Button>
    </Form>
  );
};

export default ShippingForm;
