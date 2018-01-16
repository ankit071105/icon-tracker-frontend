import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { NoData, BlockInformation, BlockTransactions } from '../../components/';
import { dateToUTC9, convertNumberToText } from '../../utils/utils';

class BlockDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.resetReducer();
    this.getBlock(this.props.location.pathname.split("/")[2], this.props.location.pathname.split("/")[3] || 1)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getBlock(nextProps.location.pathname.split("/")[2], nextProps.location.pathname.split("/")[3] || 1);
    }
  }

  getBlock = (blockId, pageId = 1) => {
    const data = {
      blockId: blockId,
      pageId: pageId
    };
    this.props.getBlock(data);
  }

  render() {
    const { loading, data, pageNum, maxPageNum} = this.props;
    const content = (data) => {
      // 데이터가 없을 경우
      if (data === "") {
        return (
          <NoData string={this.address}/>
        )
      }
      else {
        const { blockDetail, blockTx } = data;
        return (
          <div className="content-wrap">
    				<div className="screen0">
    					<BlockInformation
                blockDetail={blockDetail} />
    				</div>
    				<div className="screen1">
    					<BlockTransactions
                height={blockDetail.height}
                loading={loading}
                blockTx={blockTx}
                pageNum={pageNum}
                maxPageNum={maxPageNum} />
    				</div>
    			</div>
        )
      }
    }
    return (content(data));
  }
}

export default withRouter(BlockDetailPage);