import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { numberWithCommas, convertNumberToText, dateToUTC9 } from '../../utils/utils'
import { LoadingComponent } from '../../components'

class WalletTransactions extends Component {
  render() {
    const { walletTx } = this.props
    return (
      <div className="wrap-holder">
        <p className="title">Transaction List</p>
        <div className="contents">
          <table className="table-typeC">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Block</th>
                <th>Time Stamp<em>(UTC+9)</em></th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {walletTx.map(tx => {
                const { txHash, height, createDate, fromAddr, toAddr, amount, fee, totalTx } = tx
                return (
                  <tr key={txHash}>
                    <td className="on break">{txHash}</td>
                    <td className="on">{numberWithCommas(height)}</td>
                    <td>{dateToUTC9(createDate)}</td>
                    <td className="break">{fromAddr}</td>
                    <td className="break">{toAddr}</td>
                    <td><span>{convertNumberToText(amount, 'icx')}</span><em>ICX</em></td>
                    <td><span>{convertNumberToText(fee, 'icx')}</span><em>ICX</em></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <ul className="page">
            <li>
              <span className="start"><em className="img"></em></span>
            </li>
            <li>
              <span className="prev"><em className="img"></em></span>
            </li>
            <li className="pageNum">
              <p>Page</p>
              <input type="text" className="txt-type-page" placeholder="" value=""/> / 10000
            </li>
            <li>
              <span className="next"><em className="img"></em></span>
            </li>
            <li>
              <span className="end"><em className="img"></em></span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(WalletTransactions);