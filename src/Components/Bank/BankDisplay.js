import React, { PropTypes } from 'react';

import BankImage from './BankSplashImg';
import BankDescription from './BankDescription';
import AddFundsButton from '../AddFundsButton';
import BankActivity from './BankActivity';
import BankHistory from './BankHistory';

const BankDisplay = ({ bank }) => {
  console.log('BANK DISPLAY: bank = ', bank);
  return (
    <div className="container-fluid">
      <div className="row">
        {/*
          This component depicts one of the images from the Banks data set.

          It should receive the images array from the bank obj.
        */}
        <BankImage images={bank.description.images} />

        {/*
          BankDescription simply displays all the relevant information about the Bank.

          It should pass in the decription object from the bank object.
        */}
        <BankDescription
          description={bank.description}
          finance={bank.finance}
        />
      </div>

      {/*
        This button should navigate them to "/donation" with this banks information.
      */}
      <AddFundsButton bankid={bank._id} />

      {/* This component receives an array of all the transactions. */}
      <BankActivity transactions={bank.transactions} />

      {/* This component receives bank history information. */}
      <BankHistory history={bank.history || ''} />

    </div>
  );
};

BankDisplay.propTypes = {
  bank: PropTypes.objectOf(PropTypes.object),
};
export default BankDisplay;
