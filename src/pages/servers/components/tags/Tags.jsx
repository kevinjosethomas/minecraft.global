import { Fragment } from "react";

import Tag from "./components/Tag";
import Category from "./components/Category";
import { useToasts } from "react-toast-notifications";

function RefineTags(props) {
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-full space-y-4">
      <Categories {...props} />
      {props.categories.filter((category) => category.checked).length ? (
        <div className="w-full h-0.5 bg-dark-60" />
      ) : (
        <Fragment />
      )}
      <Tags {...props} />
      <div className="w-full h-2 bg-dark-60" />
    </div>
  );
}

function Categories(props) {
  const setActiveCategory = (id) => {
    const newCategories = [...props.categories];
    newCategories.forEach((category, index) => {
      if (category.id == id) {
        newCategories[index].checked = true;
      }
    });
    props.setCategories(newCategories);
  };

  const setInactiveCategory = (id) => {
    const newCategories = [...props.categories];
    newCategories.forEach((category, index) => {
      if (category.id == id) {
        newCategories[index].checked = false;
        newCategories[index].tags.forEach(
          (tag, ind) => (newCategories[index].tags[ind].checked = false)
        );
      }
    });
    props.setCategories(newCategories);
  };

  return (
    <div className="flex flex-row items-center justify-center h-full space-x-4">
      <h1 className="font-semibold text-2xl text-gray-400">Filter by:</h1>
      {props.categories.filter((category) => category.checked).length ? (
        <Fragment>
          <div className="flex flex-row items-center justify-center space-x-4">
            {props.categories
              .filter((category) => category.checked)
              .map((category, index) => (
                <Category
                  key={index}
                  setActiveCategory={setActiveCategory}
                  setInactiveCategory={setInactiveCategory}
                  {...category}
                />
              ))}
          </div>
          <div className="w-0.5 h-1/2 bg-dark-60" />
        </Fragment>
      ) : (
        <Fragment />
      )}
      <div className="flex flex-row items-center justify-center space-x-2">
        {props.categories
          .filter((category) => !category.checked)
          .map((category, index) => (
            <Category
              key={index}
              setActiveCategory={setActiveCategory}
              setInactiveCategory={setInactiveCategory}
              {...category}
            />
          ))}
      </div>
    </div>
  );
}

function Tags(props) {
  const { addToast } = useToasts();

  const setActiveTag = (id) => {
    const tags = [];
    props.categories
      .filter((category) => category.checked)
      .forEach((category) => {
        category.tags
          .filter((tag) => tag.checked)
          .forEach((tag) => tags.push(tag));
      });
    if (tags.length == 10) {
      addToast("You cannot filter with more than 10 tags!", {
        appearance: "error",
      });
      return;
    }
    const newCategories = [...props.categories];
    newCategories.forEach((category, index) => {
      category.tags.forEach((tag, ind) => {
        if (tag.id == id) {
          newCategories[index].tags[ind].checked = true;
        }
      });
    });
    props.setCategories(newCategories);
  };

  const setInactiveTag = (id) => {
    const newCategories = [...props.categories];
    newCategories.forEach((category, index) => {
      category.tags.forEach((tag, ind) => {
        if (tag.id == id) {
          newCategories[index].tags[ind].checked = false;
        }
      });
    });
    props.setCategories(newCategories);
  };

  return (
    <div className="flex flex-row items-start justify-starts max-w-7xl h-full space-x-4">
      {props.categories.filter((category) => {
        return category.checked && category.tags.some((tag) => tag.checked);
      }).length ? (
        <Fragment>
          <div className="flex flex-row items-center justify-start flex-wrap max-w-[40%] max-h-20 overflow-y-scroll tag-filter-scroll">
            {props.categories
              .filter((category) => category.checked)
              .map((category) => {
                return (
                  <Fragment>
                    {category.tags
                      .filter((tag) => tag.checked)
                      .map((tag, index) => (
                        <Tag
                          key={index}
                          setActiveTag={setActiveTag}
                          setInactiveTag={setInactiveTag}
                          {...tag}
                        />
                      ))}
                  </Fragment>
                );
              })}
          </div>
          <div className="self-center w-0.5 h-1/2 bg-dark-60" />
        </Fragment>
      ) : (
        <Fragment />
      )}
      <div className="flex flex-row items-start justify-start flex-wrap max-w-[60%] max-h-20 overflow-y-scroll tag-filter-scroll">
        {props.categories
          .filter((category) => category.checked)
          .map((category) => {
            return (
              <Fragment>
                {category.tags
                  .filter((tag) => !tag.checked)
                  .map((tag, index) => (
                    <Tag
                      key={index}
                      setActiveTag={setActiveTag}
                      setInactiveTag={setInactiveTag}
                      {...tag}
                    />
                  ))}
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default RefineTags;
