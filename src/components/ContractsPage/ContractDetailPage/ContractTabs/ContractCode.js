import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { makeDownloadLink, tokenText, isValidData } from '../../../../utils/utils'
import { getSrcCodeLink } from '../../../../redux/api/restV3/iiss'
import { CopyButton, LoadingComponent } from '../../../../components'

class ContractCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeLink: '',
            updatedLink: '',
        }
    }

    async componentDidMount() {
        const { contract } = this.props
        const { data } = contract
        const { public_key } = data
        console.log(this.props, "contract code comp")
        this.getDownloadLink()
        const cxdata = await getSrcCodeLink(public_key)
        console.log(cxdata, "contract code comp")
    }

    getDownloadLink = async () => {
        const { contract } = this.props
        console.log(this.props, "download link props")
        const { data } = contract
        const { public_key, contractVersion, newVersion } = data
        if (isValidData(public_key)) {
            const activeLink = isValidData(contractVersion) ? await makeDownloadLink(public_key, contractVersion) : ''
            const updatedLink = isValidData(newVersion) ? await makeDownloadLink(public_key, newVersion) : ''
            console.log(activeLink, updatedLink)
            this.setState({ activeLink, updatedLink })
        }
    }

    render() {
        const { activeLink, updatedLink } = this.state
        const { contract, contractAbi } = this.props
        const { data } = contract
        console.log(data, "render code data")
        const { public_key, name, symbol, contractVersion, newVersion } = data
        const { loading, data: abiData, error } = contractAbi
        return (
            <div className="contents">
                <div className="table-box">
                    <table className="table-typeL">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>Active </th>
                                <th>Updated Contract Source Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td>{tokenText(name, symbol)}</td>
                                <DownloadLink link={activeLink} name={`${name}_${contractVersion}.zip`} />
                                <DownloadLink link={updatedLink} name={`${name}_${newVersion}.zip`} />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="code-box api">
                    <div className="title-group">
                        <span className="title">Contract ABI</span>
                        <CopyButton data={JSON.stringify(abiData)} title={'Copy ABI'} disabled={!!error} />
                    </div>
                    {loading ? (
                        <LoadingComponent height="230px" />
                    ) : (
                        <div className="scroll">
                            <p className="txt" style={{ whiteSpace: 'pre' }}>
                                {!!error ? error : JSON.stringify(abiData, null, '\t')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const DownloadLink = ({ link, name }) => {
    const Content = () => {
        if (link) {
            return (
                <td>
                    <span>
                        <i className="img" />
                        <a href={link} download={name}>
                            Download
                        </a>
                    </span>
                </td>
            )
        } else {
            return <td>-</td>
        }
    }
    return Content()
}

export default withRouter(ContractCode)
