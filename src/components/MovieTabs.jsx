import React from "react";

class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <ul className="tabs nav nav-pills mb-5">
        <NavItem
          {...this.props}
          sort_value={"popularity.desc"}
          name={"Популярное"}
        />
        <NavItem {...this.props} sort_value={"revenue.desc"} name={"Сборы"} />
        <NavItem
          {...this.props}
          sort_value={"vote_average.desc"}
          name={"Голоса"}
        />
      </ul>
    );
  }
}

const NavItem = props => {
  const handleClick = value => {
    return event => {
      props.updateSortBy(value);
    };
  };

  const getClassLink = value => {
    return `nav-link ${props.sort_by === value ? "active" : ""}`;
  };

  return (
    <li className="nav-item">
      <div
        className={getClassLink(props.sort_value)}
        onClick={handleClick(props.sort_value)}
      >
        {props.name}
      </div>
    </li>
  );
};

export default MovieTabs;
