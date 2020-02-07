import React, { Component } from 'react';
import { object, string, bool, shape, func } from 'prop-types';

const propTypes = {
  input: shape({
    onChange: func.isRequired
  }).isRequired,
  placeholder: string,
  disabled: bool,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired
};

const defaultProps = {
  disabled: false
};

class LocationField extends Component {
  constructor(props) {
    super(props);

    if (props.meta.initial) {
      const { address, lat, lng, countryCode } = props.meta.initial;
      this.state = { address, lat, lng, countryCode };
    } else {
      this.state = {
        address: '',
        lat: null,
        lng: null,
        countryCode: null
      };
    }
  }

  componentDidMount() {
    this.searchBox = new google.maps.places.Autocomplete(this.locationNode);
    this.searchBox.addListener('place_changed', this.onPlacesChanged);
  };

  componentWillUnmount() {
    google.maps.event.clearInstanceListeners(this.searchBox);
    document.querySelector('.pac-container').remove();
  };

  focusHandler = () => {
    this.setState({ address: '', lat: null, lng: null, countryCode: '' });
    this.updateLocation();
  };

  changeHandler = ({ target: { value } }) => {
    this.setState({ address: value });
    this.updateLocation();
  };

  blurHandler = () => {
    this.updateLocation();
  };

  onPlacesChanged = () => {
    const { geometry: { location }, formatted_address, address_components } = this.searchBox.getPlace();
    const countryCode = this.getCountryCode(address_components);
    this.setState({ address: formatted_address, lat: location.lat(), lng: location.lng(), countryCode });
    this.updateLocation();
  };

  getCountryCode = addressComponents => {
    const country = addressComponents.find(component => component.types.includes('country'));
    return country && country.short_name;
  };

  updateLocation = () => {
    const {
      state: { address, lat, lng, countryCode },
      props: { input: { onChange } }
    } = this;
    onChange({ address, lat, lng, countryCode });
  }

  render() {
    const {
      focusHandler,
      changeHandler,
      blurHandler,
      state: { address },
      props: { input, placeholder, disabled, meta: { touched, error } }
    } = this;

    return (
      <div>
        <input
          { ...{ ...input, disabled, value: address, onChange: changeHandler, onBlur: blurHandler } }
          className='reminder-input'
          placeholder={ placeholder }
          ref={ node => this.locationNode = node }
          type='text'
          onFocus={ focusHandler }
        />
        { touched && (error && <span>{ error }</span>) }
      </div>
    );
  }
};
LocationField.propTypes = propTypes;
LocationField.defaultProps = defaultProps;

export default LocationField;
