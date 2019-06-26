import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import SearchBar from "./search.component";
import SearchContainer from './searchContainer.component';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//SearchBar tests
describe("SearchBar component", () => {
  //Checks if search bar component renders
  test("renders", () => {
    const searchBar = shallow(<SearchBar />);

    expect(searchBar.exists()).toBe(true);
  });

  //Checks if user entered text is passed to the props
  test("Entered text is displayed in search bar", () => {
    //We pass an empty function for the search prop as the component expects a callback from the parent when text is entered
    const searchBar = shallow(<SearchBar search={() => {}} />);

    searchBar.find("input").simulate("change", {
      target: { value: "searchString" }
    });

    expect(searchBar.find("input").props().value).toEqual("searchString");
  });

  //Checks that the default onSubmit event is cancelled - just for coverage
  test("Default event onSubmit is cancelled", () => {
    const searchBar = shallow(<SearchBar />);
    let prevented = false;
    //changes prevented to true once preventDefault is called
    searchBar.find("form").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
});

//SearchContainer tests
describe("SearchContainer component", () => {

  //Checks if search container component renders
  test("renders", () => {
    const searchContainer = shallow(<SearchContainer />);

    expect(searchContainer.exists()).toBe(true);
  });

  //Checks to see if search bar component renders when search container renders
  test("renders SearchBar component", () => {
    const searchContainer = mount(<SearchContainer />);

    expect(searchContainer.find(SearchBar).length).toEqual(1);
  });

  //Checks search function updates state
  test("searching should update component state", () => {
    const apartmentData = [{'apartment_name':'X1','apartment_address':'','apartment_region':'Manchester'},{'apartment_name':'X2',
        'apartment_address':'','apartment_region':'Brighton'},{'apartment_name':'X3','apartment_address':'','apartment_region':'Leeds'}]

    //Checks initial state matches mockData
    const searchContainer = mount(<SearchContainer data={apartmentData} />);
    expect(searchContainer.state().searchResults).toHaveLength(3);

    //Checks search function removes Mary
    const { search } = searchContainer.find(SearchBar).props()
    search('X')
    expect(searchContainer.state().searchResults).toHaveLength(3);

    //Checks empty searchString returns original state
    search('')
    expect(searchContainer.state().searchResults).toHaveLength(3);
  });

});