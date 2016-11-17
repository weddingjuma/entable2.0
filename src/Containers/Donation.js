import React from 'react';
import { connect } from 'react-redux';

class DonationPg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      name: {
        first: '',
        last: '',
      },
      acceptTerms: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('Donation Page - nextProps: ', nextProps);
  }

  componetWillUpdate(nextProps, nextState) {
    if (this.state.acceptTerms) {
      console.info('USER ACCEPTED TERMS: ', nextState.acceptTerms);
    } else {
      console.warn('User has NOT accepted Donation terms.', nextState.acceptTerms);
    }
  }
  render() {
    return (
      <div>
        This is the Donation page.
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationPg);
