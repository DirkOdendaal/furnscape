import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const AddressSearch = ({streetRef}) => {
  const [address, setAddress] = useState("");
  const [secondaryText, setSecondaryText] = useState("");

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = (value) => {
    setAddress(value);
  };

  return (
    <div className="form__group field">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        searchOptions={{
          componentRestrictions: {
            country: ["za"],
          },
        }}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <Combobox>
            <ComboboxInput
              {...getInputProps({})}
              placeholder="Address Line 1"
              className="form__field"
              name="address"
              id="address"
              type="input"
              ref={streetRef}
            />
            <label htmlFor="address" className="form__label">
              Address Line 1
            </label>
            <ComboboxPopover>
              <ComboboxList>
                {suggestions.map((suggestion) => {
                  return (
                    <ComboboxOption
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion)}
                      value={suggestion.description}
                    />
                  );
                })}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default AddressSearch;
