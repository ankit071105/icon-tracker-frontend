import time

from e2e.utilities.automation_utils import AutomationUtils
from e2e.utilities.logger import LogGen
from e2e.config import config


class AddressPage:
    logger = LogGen.loggen()

    address_title = "//p[@class='title']"
    address_voters_list = "//*[@class='on']//span"
    address_bonders_list = "//a[@class='on']"
    address_transaction_table_count = "//*[@class='ellipsis']"
    address_total_transaction_cta = "(//*[@class='mint'])[2]"
    address_token_transfer_cta = "//li[contains(text(),'Token Transfers')]"
    address_token_transfer_table = '//table[@class="table-typeC token"]'
    address_voters_cta = "//li[contains(text(),'Voters')]"
    address_rewards_cta = "//li[contains(text(),'Rewards')]"
    address_bonders_cta = "//li[contains(text(),'Bonders')]"
    address_bonded_table = "//li[contains(text(),'Bonded')]"
    address_transaction_detail_value = "//*[contains(text(),'%s')]"
    address_transaction_new_table = "//a//span[@class='ellipsis']"
    address_delegation_cta = "//li[contains(text(),'Delegations')]"
    address_delegation_table = "//td[@class='on']"

    def __init__(self, driver):
        self.driver = driver

    def verify_user_in_address_page(self, url):
        """
        Verify user is redirected to address page when searching for appropriate data
        :param url: expected url for the result
        """
        try:
            self.logger.info(">>waiting for address title to be visible")
            AutomationUtils.wait_for_element_to_load(self, self.address_title)

            if url == self.driver.current_url:
                self.logger.info(">>redirected to expected URL")
                assert True
            else:
                AutomationUtils.log_error(self, 'redirected to wrong URL'
                                          , 'redirected_wrong_URL.png')
                assert False
        except:
            AutomationUtils.log_error(self, 'address title is not visible'
                                      , 'address_title_not_visible.png')
            assert False

    def verify_no_rows_in_transaction(self, count):
        """
        Verify the row count in transaction table.
        @param count : number of items expected
        """
        try:
            self.logger.info(">>trying to verify if number of columns in transaction table is as expected")
            AutomationUtils.wait_for_element_to_load(self, self.address_transaction_table_count)

            column_count = len(self.driver.find_elements("xpath", self.address_transaction_table_count))
            if column_count == count:
                self.logger.info(">>count verified as expected")
                assert True
            else:
                AutomationUtils.log_error(self, 'number of columns could not be verified'
                                          , 'number_of_column_could_not_be_verified.png')
                assert False

        except:
            AutomationUtils.log_error(self, 'number of columns could not be verified'
                                      , 'number_of_column_could_not_be_verified.png')
            assert False

    def click_total_transaction_count(self):
        """Click on total transaction count in address page table."""
        try:
            self.logger.info(">>trying to click on total transaction count cta")
            AutomationUtils.wait_for_element_to_load(self, self.address_total_transaction_cta)
            self.driver.find_element("xpath", self.address_total_transaction_cta).click()

        except:
            AutomationUtils.log_error(self, 'number of columns could not be verified'
                                      , 'number_of_column_could_not_be_verified.png')
            assert False

    def verify_transaction_detail_page(self, title):
        """Verify we successfully redirected to transaction detail page."""
        try:
            self.logger.info(">>trying to verify transaction detail page")
            time.sleep(config.default_sleep)
            var = self.driver.find_element("xpath", self.address_title).text
            if title in var:
                self.logger.info(">>transaction detail page verified")
                assert True
            else:
                AutomationUtils.log_error(self, 'could not verify title of transaction in transaction detail page'
                                          , 'transaction title could not be verified.png')
                assert False

        except:
            AutomationUtils.log_error(self, 'could not verify title of transaction in transaction detail page'
                                      , 'transaction title could not be verified.png')
            assert False

    def verify_transaction_detail_page_url(self, url):
        """Verify user is redirected to transaction detail page."""
        if url in self.driver.current_url:
            self.logger.info(">>redirected to expected URL")
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected to wrong URL'
                                      , 'redirected_wrong_URL.png')
            assert False

    def click_on_token_transfer(self):
        self.logger.info(">>trying to click on token transfer")
        AutomationUtils.wait_for_element_to_load(self, self.address_token_transfer_cta)
        self.driver.find_element("xpath", self.address_token_transfer_cta).click()
        self.logger.info(">>clicked on token transfer")

    def verify_token_transfer_table(self):
        self.logger.info(">>trying to verify table in token transfer")
        AutomationUtils.wait_for_element_to_load(self, self.address_token_transfer_table)
        var = self.driver.find_element("xpath", self.address_token_transfer_table)
        if var.is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'table could not be verified'
                                      , 'token_transfer_table.png')
            assert False
        self.logger.info(">>verified table")

    def click_on_voters_tab(self):
        """
            click_on_voters_tab
            -this method is used to click on the voters tab
        """
        self.logger.info(">>trying to click on voters tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_voters_cta)
        self.driver.find_element("xpath", self.address_voters_cta).click()
        self.logger.info(">>clicked on voters tab")

    def verify_all_links_in_voters_tab_works(self, count):
        """
            verify_all_links_in_voters_tab_works
            -this method is used to verify all the links present in voters tab is working as expected
        """
        try:
            self.logger.info(">>verifying all the links in voters tab")
            AutomationUtils.wait_for_element_to_load(self, self.address_voters_list)
            items = self.driver.find_elements("xpath", self.address_voters_list)
            var = items[count].text
            self.logger.info(">>voter value " + var)
            items[count].click()

            if var in self.driver.current_url:
                assert True
            else:
                AutomationUtils.log_error(self, 'redirected url is not as expected'
                                          , 'redirected_url_is_different_voters.png')
                assert False
        finally:
            self.driver.get(config.prep_address_url)
            self.click_on_voters_tab()

    def click_on_rewards_tab(self):
        """
            click_on_rewards_tab
            -this method is used to click on the rewards tab
        """
        self.logger.info(">>trying to click on rewards tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_rewards_cta)
        self.driver.find_element("xpath", self.address_rewards_cta).click()
        self.logger.info(">>clicked on rewards tab")

    def verify_all_links_in_rewards_tab_works(self, count):
        """
            verify_all_links_in_rewards_tab_works
            -this method is used to verify all the links present in rewards tab is working as expected
        """
        try:
            self.logger.info(">>verifying all the links in rewards tab")
            AutomationUtils.wait_for_element_to_load(self, self.address_transaction_table_count)
            items = self.driver.find_elements("xpath", self.address_transaction_table_count)
            var = items[count].text
            self.logger.info(">>rewards value " + var)
            items[count].click()

            if var in self.driver.current_url:
                assert True
            else:
                AutomationUtils.log_error(self, 'redirected url is not as expected'
                                          , 'redirected_url_is_different_rewards.png')
                assert False
        finally:

            self.driver.get(config.prep_address_url)
            time.sleep(config.default_sleep)
            self.click_on_rewards_tab()

    def click_on_bonders_tab(self):
        self.logger.info(">>trying to click on bonders tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_bonders_cta)
        self.driver.find_element("xpath", self.address_bonders_cta).click()
        self.logger.info(">>clicked on bonders tab")

    def verify_all_links_in_bonders_tab_works(self, count):
        try:
            self.logger.info(">>verifying all the links in rewards tab")
            AutomationUtils.wait_for_element_to_load(self, self.address_bonders_list)
            items = self.driver.find_elements("xpath", self.address_bonders_list)
            var = items[count].text
            self.logger.info(">>bonders value " + var)
            items[count].click()

            self.verify_bonded_page_table()
            if var in self.driver.current_url:
                assert True
            else:
                AutomationUtils.log_error(self, 'redirected url is not as expected'
                                          , 'redirected_url_is_different_bonders.png')
                assert False
        finally:
            self.driver.get(config.prep_address_url)
            time.sleep(config.default_sleep)
            self.click_on_bonders_tab()

    def verify_bonded_page_table(self):
        self.logger.info(">>trying to verify on bonded tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_bonded_table)
        if self.driver.find_element("xpath", self.address_bonded_table).is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'could not verify bonded list'
                                      , 'could_not_verify_bonded_list.png')
            assert False
        self.logger.info(">>clicked on verify tab")

    def verify_all_links_in_transaction_new_address_url(self, count):
        self.logger.info(">>verifying all the links in transaction tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_transaction_new_table)
        items = self.driver.find_elements("xpath", self.address_transaction_new_table)
        var = items[count].text
        self.logger.info(">>transaction value " + var)
        items[count].click()
        if var in self.driver.current_url:
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected url is not as expected'
                                      , 'redirected_url_is_not_as_expected_transaction.png')
            assert False

    def verify_page_not_open_in_new_tab(self):
        current_handle = self.driver.current_window_handle
        total_windows = self.driver.window_handles

        if len(total_windows) > 1:
            AutomationUtils.log_error(self, 'the page has been opened in new tab'
                                      , 'page_has_been_opened_in_new_tab.png')
            assert False
        elif current_handle == total_windows:
            assert True

    def click_on_delegation_tab(self):
        self.logger.info(">>trying to click on delegations tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_delegation_cta)
        self.driver.find_element("xpath", self.address_delegation_cta).click()
        self.logger.info(">>clicked on delegations tab")

    def verify_all_links_in_delegation_table(self, count: int):
        self.logger.info(">>verifying all the links in delegations tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_delegation_table)
        items = self.driver.find_elements("xpath", self.address_delegation_table)
        var = items[count].text
        self.logger.info(">>delegation value " + var)
        items[count].click()
        self.driver.switch_to.window(self.driver.window_handles[1])
        time.sleep(config.default_sleep)
        self.logger.info(">>delegation value " + self.driver.current_url)
        if var in self.driver.current_url:
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected url is not as expected'
                                      , 'redirected_url_is_not_as_expected_transaction.png')
            assert False
