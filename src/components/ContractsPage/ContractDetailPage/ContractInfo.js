import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { CopyButton, TransactionLink, LoadingComponent, QrCodeButton, AddressLink, ReportButton } from '../../../components'
import { convertNumberToText, numberWithCommas, tokenText, isValidData } from '../../../utils/utils'
import { CONTRACT_STATUS, IRC_VERSION } from '../../../utils/const'
import { convertLoopToIcxDecimal } from '../../../utils/utils'

class ContractInfo extends Component {
    onMouseOver = param => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'CONTRACT_OVER', param } }))
    }

    onMouseOut = param => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'CONTRACT_OUT', param } }))
    }

    render() {
        const { contract } = this.props
  
        const { loading, data } = contract
        const test = data[0]
        let address, balance, createTx, owner_address, ircVersion, status, symbol, txCount, depositInfo, tokenName, reportedCount
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height="206px" />
            } else {
                

                const isCreator = isValidData(owner_address)
                const isCreateTx = isValidData(createTx)
                const scam = reportedCount >= 100 ? true : false
                const { availableDeposit, availableVirtualStep } = depositInfo || {}
                return (
                    <div className="screen0">
                        <div className="wrap-holder">
                            <p className="title">Contract</p>
                            <div className="contents">
                                <div className="table-box">
                                    <table className="table-typeB contract">
                                        <tbody>
                                            <tr className="qr">
                                                <td>Address</td>
                                                <td colSpan="3" className={scam ? 'scam' : ''}>
                                                    {scam && <span className="scam-tag">Scam</span>}
                                                    {data.public_key} <QrCodeButton address={data.public_key} />
                                                    <CopyButton data={data.public_key} title={'Copy Address'} isSpan />
                                                    <ReportButton address={data.public_key} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Token Contract</td>
                                                <TokenContractCell
                                                    tokenName={tokenName}
                                                    symbol={symbol}
                                                    address={address}
                                                    ircVersion={ircVersion}
                                                    onMouseOver={this.onMouseOver}
                                                    onMouseOut={this.onMouseOut}
                                                />
                                                <td>Contract Creator</td>
                                                {isCreator && isCreateTx ? (
                                                    <td>
                                                        <span className="help address">Creator Address</span>
                                                        <span className="help hash">Creator Transaction Hash</span>
                                                        <span
                                                            className="link address ellipsis"
                                                            onMouseOver={() => {
                                                                this.onMouseOver('address')
                                                            }}
                                                            onMouseOut={() => {
                                                                this.onMouseOut('address')
                                                            }}
                                                        >
                                                           
                                                            <AddressLink to={owner_address} />
                                                        </span>
                                                        <em>at Txn</em>
                                                        <span
                                                            className="link hash ellipsis"
                                                            onMouseOver={() => {
                                                                this.onMouseOver('hash')
                                                            }}
                                                            onMouseOut={() => {
                                                                this.onMouseOut('hash')
                                                            }}
                                                        >
                                                            <TransactionLink to={createTx} />
                                                        </span>
                                                    </td>
                                                ) : (
                                                    <td>-</td>
                                                )}
                                            </tr>
                                            <tr>
                                                <td>Transactions</td>
                                                <td>{numberWithCommas(data.transaction_count)} Txns</td>
                                                <td>Status</td>
                                                <td>
                                                    {data.status}
                                                    <DetailButton contractAddr={data.public_key} contractDetailPopup={this.props.contractDetailPopup} />
                                                </td>
                                            </tr>                                            
                                            <tr>
                                                <td>Balance</td>
                                                <td>{convertNumberToText(data.balance)} ICX</td>
                                                <td>Deposit</td>
                                                {availableDeposit ? <td>{convertNumberToText(convertLoopToIcxDecimal(availableDeposit))} ICX</td> : <td>-</td>}
                                            </tr>
                                            <tr>
                                                <td>Virtual Step</td>
                                                {availableVirtualStep? <td>{convertNumberToText(availableVirtualStep)} Steps</td> : <td>-</td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return Contents()
    }
}

class DetailButton extends Component {
    handleClick = () => {
        const { contractAddr } = this.props
        this.props.contractDetailPopup({ contractAddr })
    }

    render() {
        return (
            <button onClick={this.handleClick} className="btn-type-normal status">
                Detail
            </button>
        )
    }
}

class TokenContractCell extends Component {
    render() {
        const { tokenName, symbol, address, ircVersion, onMouseOver, onMouseOut } = this.props
        const Content = () => {
            if (ircVersion === IRC_VERSION[2]) {
                return (
                    <td>
                        <span className="help token">{ircVersion} Token</span>
                        <span
                            className="link token"
                            onMouseOver={() => {
                                onMouseOver('token')
                            }}
                            onMouseOut={() => {
                                onMouseOut('token')
                            }}
                        >
                            {tokenText(tokenName, symbol, address)}
                        </span>
                    </td>
                )
            } else {
                return <td>-</td>
            }
        }
        return Content()
    }
}

export default withRouter(ContractInfo)
