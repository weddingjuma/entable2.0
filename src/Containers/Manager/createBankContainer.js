import React from 'react';
import moment from 'moment';
import { Collapse, DropdownButton, MenuItem } from 'react-bootstrap/lib';
import Breadcrumbs from '../../Components/Breadcrumb';
import createBankPgStyles from './createBankPgStyles';
import Inputcard from '../../Components/InputCard';
import Countries from '../../Services/CountryConstants';

class CreateBank extends React.Component {
  static styles = createBankPgStyles
  static breadcrumbs = [{
    href: '/',
    name: 'Home',
    active: false,
  }, {
    href: '',
    name: 'Manager Account',
    active: true,
  }];
  static PROPS = {
    bankName: {
      id: 'bankName',
      type: 'text',
      name: 'Bank Name',
      required: true,
      vSuccess: 1,
      vWarn: 1,
      vError: 2,
      placeholder: 'Butombo Village Bank',
    },
  }
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('lll'),
      dropDownOpen: false,
      bankName: '',
      bankCountry: {
        name: 'Choose Country',
        code: null,
      }
    }

    this.countries = Countries.map((country, i) => (
    <MenuItem
      key={`country${i}`}
      eventKey={i + 1}
      onClick={() =>
        this.props.onInputChange({
          name: country.name,
          code: country.code,
        }, 'country')
      }
    >{country.name} - ({country.code})
    </MenuItem>));
  }

  onInputChange = (id, value) =>
  this.setState({ [id]: value });

  toggleDropdown = () =>
  this.setState(({ dropDownOpen }) => ({ dropDownOpen: !dropDownOpen }));

  validate = (id, vSuccess, vWarn, vError) => { //eslint-disable-line
    const inputs = ['firstName', 'lastName', 'postZip', 'country', 'phone', 'password'];
    if (inputs.includes(id)) {
      const length = this.state[id].length;
      if (length > vSuccess) return 'success';
      else if (length > vWarn) return 'warning';
      else if (length > vError) return 'error';
    } else if (id === 'email') {
      const match = this.state.email.match(/.+@.+\..+/i);
      if (match) return 'success';
      else if (this.state.email) return 'warning';
    } else if (id === 'confirmPassword') {
      const cPassword = this.state.confirmPassword;
      const password = this.state.password;
      if (cPassword === password && password.length > 1) return 'success';
      if (cPassword.length > 0) return 'warning';
      else if (cPassword > 0 && cPassword !== password) return 'error';
    }
  }

  render() {
    const bankName = '<BankName>';
    const currentBal = '<Current Balance>';
    const startingBal = '<Starting Balance>';
    const growthBal = '<Growth Balance>';
    const ddButtonTitle = '<dd Button Bal>';
    const currentDate = moment().format('lll');
    console.log('dropDownOpen: ', this.state.dropDownOpen);
    return (
      <div>
        <Breadcrumbs paths={CreateBank.breadcrumbs} />
        <div style={CreateBank.styles.mainContainer}>
          <div id="ctaWelcomeMessage">
            <h4>Thanks for Becoming a Bank Manager</h4>
            <p>{'Let\'s'} get started by creating a Virtual Bank on Entable.</p>
            <p>This virtual bank is where you will manage and record the distribution of Donations to Bank members in your area, as well track and document their return payments to the Bank.</p>
            <p>Bank managers track the distribution of the donated funds "out, and the re-payments "in". Future and Past donors will be relying on the Bank Managers to provide transparent and reliable transaction information.</p>
            <br />
            <p>Click the {'"Create Bank"'} button below to get started.</p>
          </div>
          <div id="welcomeBalances">
            <div id="createBankContainer">
              <button
                onClick={this.toggleDropdown}
              >
                {this.state.dropDownOpen ? 'Cancel' : 'Create Bank'}
              </button>
              <Collapse in={this.state.dropDownOpen}>
                <div>
                  <well>
                    <Inputcard
                      {...CreateBank.PROPS.bankName}
                      onInputChange={this.onInputChange}
                      value={this.state.bankName}
                      validate={this.validate}
                    />
                    <div style={CreateBank.styles.createBankForm}>
                      <div>

                        <label htmlFor="country">Country:
                          <span style={CreateBank.styles.required}> *</span>
                        </label>
                        <br />
                        <DropdownButton
                          title={this.state.bankCountry.name}
                          id="bankCountry"
                        >
                          {this.countries}
                        </DropdownButton>
                      </div>

                      <div style={CreateBank.styles.bankCityInput}>
                        <label htmlFor="bankCity">City</label>
                        <input type="text" id="bankCity" />
                      </div>
                      <div style={CreateBank.styles.bankPhoneInput}>
                        <label htmlFor="bankPhone">Phone</label>
                        <input type="text" id="bankPhone" />
                      </div>
                      <div>
                        <label htmlFor="transPhoto">
                          Bank Photo(s)
                        </label>
                        <input
                          id="transPhoto"
                          type="text"
                          value={this.state.photoUrl}
                          onChange={e =>
                            this.setState({ photoUrl: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="transLegal">
                          Legal Agreement
                        </label>
                        <input
                          id="transLegal"
                          type="checkbox"
                          value={this.state.agreement}
                          onChange={e =>
                            this.setState({ agreement: e.target.value })
                          }
                        />
                      </div>
                      <div id="submitTransaction">
                        <button onClick={() => console.log('submit transaction')}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </well>
                </div>
              </Collapse>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default CreateBank;
