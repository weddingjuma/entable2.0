import React from 'react';
import moment from 'moment';

const BankHistory = () => {
  const fakeTimeStamp = this.props.timeStamp || moment().format('lll');
  return (
    <span>
      <div className="transactionHeader">
        <h3>Bank History & Notes to Sponsors</h3>
      </div>

      <div className="transactionHistoryContainer text-center">
        <div className="transactionItem">
          <br />
          <p>
            <span className="timeStamp">{fakeTimeStamp}</span>
            <span className="bankerName">
              Betty Hascal - <i>Bank Manager</i>
            </span>
          </p>
          <p>{String('Sara\'s')} son started school with new books.</p>
          <hr className="bankHistoryHr" />
        </div>
        <div className="transactionItem">
          <br />
          <p><span className="timeStamp">{fakeTimeStamp}</span> <span className="bankerName">  Betty Hascal - <i>Bank Manager</i></span></p>
          <p>{('Anile\'s')} farm bought breeding pigs.</p>
          <hr className="bankHistoryHr" />
        </div>
        <div className="transactionItem">
          <br />
          <p><span className="timeStamp">{fakeTimeStamp}</span> <span className="bankerName">  Betty Hascal - <i>Bank Manager</i></span></p>
          <p>Aide bought supplies to increase productivity of chicken operation.</p>
          <hr className="bankHistoryHr" />
        </div>
        <div className="transactionItem">
          <br />
          <p><span className="timeStamp">{fakeTimeStamp}</span> <span className="bankerName">  Betty Hascal - <i>Bank Manager</i></span></p>
          <p>{'Sarah\'s'} son started school with new books.</p>
          <hr className="bankHistoryHr" />
        </div>
      </div>
    </span>
  );
};

export default BankHistory;
