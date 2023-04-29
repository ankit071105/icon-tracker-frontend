import React, { useState, useEffect } from "react";
import MiscComponents from "../MiscComponents/MiscContractComponents";
import ButtonSet from "../MiscComponents/ButtonSet";
import styles from "./ContractExplorerPage.module.css";
import { isCxAddress } from "../../../utils/utils";

const { ReadMethod, WriteMethod } = MiscComponents;

const initialInputItemsState = {
  address: "cx0000000000000000000000000000000000000000",
  endpoint: "http://localhost:9000",
  nid: "3"
};
function ContractExplorerPage(props) {
  const [activeSection, setActiveSection] = useState(0);
  const [networkState, setNetworkState] = useState("mainnet");
  const [inputItemsState, setInputItemsState] = useState(
    initialInputItemsState
  );
  const [cxAbi, setCxAbi] = useState(null);

  function onNetworkChange(e) {
    console.log(e.target.value);
    setNetworkState(e.target.value);
  }

  function handleInputChange(event, label) {
    console.log("event target");
    console.log(event.target);
    event.persist();
    setInputItemsState(state => {
      return {
        ...state,
        [label]: event.target.value
      };
    });
  }

  function handleAddressInputChange(event) {
    handleInputChange(event, "address");
  }

  useEffect(() => {
    const isValidCxAddress = isCxAddress(inputItemsState.address);

    if (isValidCxAddress) {
      if (networkState === "custom") {
        // TODO: put logic for custom network here
      } else {
        props.readContractInformation(
          {
            address: inputItemsState.address
          },
          networkState
        );
        props.icxGetScore(
          {
            address: inputItemsState.address
          },
          networkState
        );
      }
    }
  }, [networkState, inputItemsState]);

  useEffect(() => {
    if (!props.contractAbi.loading) {
      setCxAbi(props.contractAbi.data);
    }
  }, [props.contractAbi]);

  // useEffect(() => {
  //   console.log('updated contract abi');
  //   console.log(cxAbi);
  // }, [cxAbi]);

  console.log("contract explorer props");
  console.log(props);

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.pageTitle}>Contract Writer</div>
        <div className={`${styles.pageContent}`}>
          <div
            className={`${styles.pageContentHeader} ${styles.paperContainer}`}
          >
            <InputItem
              label={`Address`}
              value={inputItemsState.address}
              onValueChange={handleAddressInputChange}
            />
            <Separator />
            <DropdownItem label={`Network`} onSelectChange={onNetworkChange} />
            {networkState === "custom" && (
              <>
                <Separator />
                <CustomNetworkItem
                  endpointLabel={`Endpoint`}
                  endpointNid={`NID`}
                  values={inputItemsState}
                  onValuesChange={handleInputChange}
                />
              </>
            )}
          </div>
          <div className={`${styles.pageContentBody} ${styles.paperContainer}`}>
            <ButtonSet
              activeButton={activeSection}
              handleActiveChange={setActiveSection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputItem({
  label,
  value,
  onValueChange,
  useSmall = false,
  placeholder = "cx0000..",
  halfSize = false
}) {
  return (
    <div
      className={
        halfSize
          ? `${styles.inputItem} ${styles.inputItemHalfSize}`
          : `${styles.inputItem}`
      }
    >
      <div className={styles.inputItemLabel}>{label}</div>
      <div
        className={
          !useSmall
            ? `${styles.inputItemContent}`
            : `${styles.inputItemContent} ${styles.inputItemContentSmall}`
        }
      >
        <input
          className={styles.inputItemInput}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
}

function DropdownItem({ label, onSelectChange }) {
  return (
    <div className={styles.dropdownItem}>
      <div className={styles.dropdownItemLabel}>{label}</div>
      <div className={styles.dropdownItemContent}>
        <select className={styles.dropdownItemSelect} onChange={onSelectChange}>
          <option value="mainnet">Mainnet</option>
          <option value="berlin">Berlin</option>
          <option value="lisbon">Lisbon</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  );
}

function CustomNetworkItem({
  endpointLabel,
  endpointNid,
  values,
  onValuesChange
}) {
  function handleEndpointChange(event) {
    onValuesChange(event, "endpoint");
  }

  function handleNidChange(event) {
    onValuesChange(event, "nid");
  }

  return (
    <div className={styles.customNetworkItem}>
      <InputItem
        label={endpointLabel}
        value={values.endpoint}
        onValueChange={handleEndpointChange}
      />
      <Separator useVertical={true} />
      <InputItem
        label={endpointNid}
        useSmall={true}
        placeholder="3"
        value={values.nid}
        onValueChange={handleNidChange}
      />
    </div>
  );
}

function Separator({ useVertical = false }) {
  return (
    <div
      className={
        useVertical ? `${styles.separatorVertical}` : `${styles.separator}`
      }
    ></div>
  );
}
export default ContractExplorerPage;
