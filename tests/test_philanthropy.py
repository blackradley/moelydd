from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re, os
class IDE(unittest.TestCase):
    def setUp(self):
        desired_capabilities = webdriver.DesiredCapabilities.CHROME
        desired_capabilities['platform'] = "Windows XP"
        desired_capabilities['version'] = "26"
        desired_capabilities['name'] = 'Testing Philanthropy Toolkit'
        self.driver = webdriver.Remote(
            desired_capabilities=desired_capabilities,
            command_executor="http://drbollins:2223cecf-a9cc-48b8-b730-5c6c0f658265@ondemand.saucelabs.com:80/wd/hub"
        )
        self.driver.implicitly_wait(30)
        self.base_url = "http://toolkits.blackradley.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
        
    def XXXsetUp(self):
        self.driver = webdriver.Chrome()
        #self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8080/"
        self.verificationErrors = []
        self.accept_next_alert = True    
    
        
    def test_i_d_e(self):
        driver = self.driver
        driver.get(self.base_url)
        driver.find_element_by_link_text("ACCEPT COOKIES").click()
        driver.get(self.base_url)
        driver.maximize_window()  
        driver.find_element_by_link_text("Intent - What is the intent of the philanthropy and fundraising?").click()
        driver.find_element_by_id("socioeconomic").clear()
        driver.find_element_by_id("socioeconomic").send_keys("Assisting the community realize their economic potential")
        driver.find_element_by_id("impact").clear()
        driver.find_element_by_id("impact").send_keys("A driving force for good within two years")
        driver.find_element_by_id("artistic").clear()
        driver.find_element_by_id("artistic").send_keys("Populist and accessible")
        
        driver.find_element_by_link_text("Themes - What are the themes for the philanthropy and fundraising?").click()
        Select(driver.find_element_by_id("themeType")).select_by_visible_text("Target Market")
        driver.find_element_by_id("description-0").clear()
        driver.find_element_by_id("description-0").send_keys("Disadvantaged young people")

        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        Select(driver.find_element_by_xpath("(//select[@id='themeType'])[2]")).select_by_visible_text("Target Market")
        driver.find_element_by_id("description-1").clear()
        driver.find_element_by_id("description-1").send_keys("Older unemployed people in danger of exclusion")
        
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        Select(driver.find_element_by_xpath("(//select[@id='themeType'])[3]")).select_by_visible_text("Core Service")
        driver.find_element_by_id("description-2").clear()
        driver.find_element_by_id("description-2").send_keys("Supporting school curriculum")
        
        driver.find_element_by_link_text("Funding - What are the funding sources that are available to fund the themes?").click()
        driver.find_element_by_css_selector("input[type=\"checkbox\"]").click()
        driver.find_element_by_id("public-0").clear()
        driver.find_element_by_id("public-0").send_keys("ACE has a funding scheme for out of work 19 to 25 year olds")
        driver.find_element_by_xpath("(//input[@type='checkbox'])[14]").click()
        driver.find_element_by_id("trusts-1").clear()
        driver.find_element_by_id("trusts-1").send_keys("Esmee Fairburn may be able to help")
        driver.find_element_by_xpath("(//input[@type='checkbox'])[35]").click()
        driver.find_element_by_id("visitor-2").clear()
        driver.find_element_by_id("visitor-2").send_keys("Signs in relevant galleries")
        
        driver.find_element_by_link_text("Constraints - What are the constraints which may impact the fundraising activity?").click()
        driver.find_element_by_id("operational-yes-0").click()
        driver.find_element_by_id("operational-0").clear()
        driver.find_element_by_id("operational-0").send_keys("There may be problems identifying suitable individuals in the client group")
        driver.find_element_by_id("financial-no-0").click()
        driver.find_element_by_id("financial-0").clear()
        driver.find_element_by_id("financial-0").send_keys("No issues if fully funded")
        driver.find_element_by_id("political-no-0").click()
        driver.find_element_by_id("political-0").clear()
        driver.find_element_by_id("political-0").send_keys("Will have strong political support")
        
        driver.find_element_by_id("operational-no-1").click()
        driver.find_element_by_id("operational-1").clear()
        driver.find_element_by_id("operational-1").send_keys("There are plenty of older unemployed people living in Church Stretton.")
        driver.find_element_by_id("financial-no-1").click()
        driver.find_element_by_id("financial-1").clear()
        driver.find_element_by_id("financial-1").send_keys("Grant has already been applied for.  No issues if fully funded.")
        driver.find_element_by_id("political-yes-1").click()
        driver.find_element_by_id("political-0").clear()
        driver.find_element_by_id("political-1").send_keys("Will have weak political support.")
    
        driver.find_element_by_id("operational-yes-2").click()
        driver.find_element_by_id("operational-2").clear()
        driver.find_element_by_id("operational-2").send_keys("Demand will be high so selecting the client schools is a problem.")
        driver.find_element_by_id("financial-no-2").click()
        driver.find_element_by_id("financial-2").clear()
        driver.find_element_by_id("financial-2").send_keys("Can be easily funded with the profits from the tuck shop.")
        driver.find_element_by_id("political-no-2").click()
        driver.find_element_by_id("political-2").clear()
        driver.find_element_by_id("political-2").send_keys("Has strong political support from the Council Leader.")
        
        driver.find_element_by_link_text("Action - What are the actions required to progress this?").click()
        driver.find_element_by_id("vision-0").clear()
        driver.find_element_by_id("vision-0").send_keys("Young people's life chances will be enhanced by the service.")
        driver.find_element_by_id("first-0").clear()
        driver.find_element_by_id("first-0").send_keys("ACE Application")
        driver.find_element_by_id("discomfort-0").clear()
        driver.find_element_by_id("discomfort-0").send_keys("Council is not addressing the client group adequately, major political concern.")
    
        driver.find_element_by_id("vision-1").clear()
        driver.find_element_by_id("vision-1").send_keys("Older people's life chances will be enhanced by the service.")
        driver.find_element_by_id("first-1").clear()
        driver.find_element_by_id("first-1").send_keys("ACE Application")
        driver.find_element_by_id("discomfort-1").clear()
        driver.find_element_by_id("discomfort-1").send_keys("Council is not addressing the client group adequately, major political concern.")

        driver.find_element_by_id("vision-2").clear()
        driver.find_element_by_id("vision-2").send_keys("School children's life chances will be enhanced by the service.")
        driver.find_element_by_id("first-2").clear()
        driver.find_element_by_id("first-2").send_keys("ACE Application")
        driver.find_element_by_id("discomfort-2").clear()
        driver.find_element_by_id("discomfort-2").send_keys("Council is not addressing the client group adequately, major political concern.")

        driver.find_element_by_link_text("Action - What are the actions required to progress this?").click()
        driver.find_element_by_link_text("Print Document").click()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
