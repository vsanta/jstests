require "test/unit"
require "rubygems"
gem "selenium-client"
require "selenium/client"
require "ruby-debug"

class SampleSeleniumTest < Test::Unit::TestCase

  def setup
    @verification_errors = []
    @selenium = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*firefox",
      :url => "http://localhost:8000/",
      :timeout_in_second => 60,
      :profile => "selenium"

    @selenium.start_new_browser_session
  end
  
  def teardown
    @selenium.close_current_browser_session
    assert_equal [], @verification_errors
  end
  
  def assert_all_qunit_pass timeout=10
    @selenium.wait_for_condition 'selenium.browserbot.getCurrentWindow().QUnit.suite_done', timeout
    assert_equal "0", @selenium.get_text("//p[@id='qunit-testresult']/span[@class=\"failed\"]")
  end

  #Here is a sample test
  def test_selenium
    @selenium.open "my-test-suite.html"
  end
end