/**
 * Example usage of CustomDropdown component
 * 
 * This file shows different ways to use the CustomDropdown component.
 * You can delete this file after reviewing the examples.
 */

import CustomDropdown from "./CustomDropdown";
import { HiGlobeAlt, HiUser, HiMail } from "react-icons/hi";

// Example 1: Simple dropdown with options
export function SimpleDropdownExample() {
  const [selected, setSelected] = useState("option1");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <CustomDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select an option"
    />
  );
}

// Example 2: Dropdown with icons
export function DropdownWithIconsExample() {
  const [selected, setSelected] = useState("en");

  const options = [
    { value: "en", label: "English", icon: <HiGlobeAlt /> },
    { value: "fr", label: "Français", icon: <HiGlobeAlt /> },
    { value: "nl", label: "Nederlands", icon: <HiGlobeAlt /> },
  ];

  return (
    <CustomDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select language"
    />
  );
}

// Example 3: Custom positioning
export function CustomPositionExample() {
  const [selected, setSelected] = useState(null);

  const options = [
    { value: "left", label: "Left aligned" },
    { value: "right", label: "Right aligned" },
    { value: "center", label: "Center aligned" },
  ];

  return (
    <div className="flex gap-4">
      <CustomDropdown
        options={options}
        value={selected}
        onChange={setSelected}
        position="left"
        placeholder="Left"
      />
      <CustomDropdown
        options={options}
        value={selected}
        onChange={setSelected}
        position="center"
        placeholder="Center"
      />
      <CustomDropdown
        options={options}
        value={selected}
        onChange={setSelected}
        position="right"
        placeholder="Right"
      />
    </div>
  );
}

// Example 4: Custom trigger button
export function CustomTriggerExample() {
  const [selected, setSelected] = useState("user");

  const options = [
    { value: "user", label: "User Profile", icon: <HiUser /> },
    { value: "email", label: "Email Settings", icon: <HiMail /> },
  ];

  const customTrigger = (
    <button className="px-4 py-2 bg-primary text-white rounded-lg">
      Custom Trigger
    </button>
  );

  return (
    <CustomDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      trigger={customTrigger}
    />
  );
}

// Example 5: Custom option rendering
export function CustomRenderExample() {
  const [selected, setSelected] = useState("premium");

  const options = [
    { value: "basic", label: "Basic Plan", price: "$9/month" },
    { value: "premium", label: "Premium Plan", price: "$29/month" },
    { value: "enterprise", label: "Enterprise Plan", price: "$99/month" },
  ];

  return (
    <CustomDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      renderOption={(option, isSelected) => (
        <div
          className={`px-4 py-3 ${
            isSelected ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          <div className="font-semibold">{option.label}</div>
          <div className="text-xs opacity-75">{option.price}</div>
        </div>
      )}
    />
  );
}

// Example 6: Disabled options
export function DisabledOptionsExample() {
  const [selected, setSelected] = useState("active");

  const options = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending", disabled: true },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <CustomDropdown
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select status"
    />
  );
}
