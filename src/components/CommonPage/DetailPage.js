import React, { Component } from "react";
import {
  startsWith,
  findTabIndex,
  noSpaceLowerCase,
  isHxAddress
} from "../../utils/utils";
import { NotFoundPage, PendingPage } from "../../components";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: 0
    };
  }

  componentDidMount() {
    this.setInitialData(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: currentPath } = this.props.url;
    const { pathname: nextPath } = nextProps.url;
    const { ROUTE } = this.props;
    if (currentPath !== nextPath && startsWith(nextPath, ROUTE)) {
      this.setInitialData(nextProps.url);
      return;
    } else {
      const { hash: currentHash } = this.props.url;
      const { hash: nextHash } = nextProps.url;
      const { TABS: currentTabs } = this.props;
      const { TABS: nextTabs } = nextProps;
      if (currentHash !== nextHash || currentTabs.length !== nextTabs.length) {
        this.setTab(findTabIndex(nextTabs, nextHash));
      }
    }
  }

  setInitialData = url => {
    const query = url.pathname.split("/")[2];
    if (query) {
      const { TABS } = this.props;
      this.props.getInfo(query);
      this.setTab(findTabIndex(TABS, url.hash), query);
      if (this.props.ROUTE === "/block") {
        // Execute initial time for Internal TX
        this.props.getList[1](query);
      }
      if (this.props.ROUTE === "/transaction") {
        this.props.tokenTxList &&
          this.props.tokenTxList({ transaction_hash: query });
      }
    }
  };

  setTab = (index, query) => {
    const _index = index !== -1 ? index : 0;
    this.setState({ on: _index }, () => {
      this.setList(this.props.getList[_index], query);
    });
  };

  setList = (getListFunc, query) => {
    const _query = query ? query : this.props.url.pathname.split("/")[2];
    if (typeof getListFunc === "function") {
      getListFunc(_query);
    }
  };

  changeTab = index => {
    const { TABS, url } = this.props;
    const { pathname } = url;
    this.props.history.push(`${pathname}#${noSpaceLowerCase(TABS[index])}`);
  };

  render() {
    const { loading, error, pending } = this.props;
    const isNotFoundPage =
      !loading && error !== "" && !isHxAddress(error) && !pending;

    const Content = () => {
      if (pending) {
        return <PendingPage error={error} />;
      } else if (isNotFoundPage) {
        return <NotFoundPage error={error} />;
      } else {
        const { InfoComponent, TabsComponent } = this.props;
        console.log(this.props, "the props detail page");

        return (
          <div className="content-wrap">
            <InfoComponent {...this.props} />
            <TabsComponent
              {...this.props}
              {...this.state}
              changeTab={this.changeTab}
            />
          </div>
        );
      }
    };
    return Content();
  }
}

export default DetailPage;
