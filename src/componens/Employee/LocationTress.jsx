import './index.less';
import './dropdown.less';
import { listLocation } from '../../../Services/apiData';
import React from "react";
import Trigger from "rc-trigger";
import Tree, { TreeNode } from "rc-tree";

const placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
    offset: [0, -3],
    targetOffset: [0, 0],
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
    offset: [0, 3],
    targetOffset: [0, 0],
  },
};

class DropdownTree extends React.Component {
  static defaultProps = {
    prefixCls: "demo-dropdown-tree",
    trigger: ["hover"],
    overlayClassName: "",
    overlayStyle: {},
    defaultVisible: false,
    onVisibleChange() {},
    placement: "bottomLeft",
  };

  constructor(props) {
    super(props);
    this.triggerRef = React.createRef();
    if ("visible" in props) {
      this.state = {
        visible: props.visible,
      };
      return;
    }
    this.state = {
      visible: props.defaultVisible,
    };
  }

  static getDerivedStateFromProps(props) {
    if ("visible" in props) {
      return {
        visible: props.visible,
      };
    }
    return null;
  }

  onChange = (value) => {
    console.log("change", value);
  };

  onSelect = (value) => {
    console.log("select ", value);
  };

  onClick = (e) => {
    const { props } = this;
    const overlayProps = props.overlay.props;
    if (!("visible" in props)) {
      this.setState({
        visible: false,
      });
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  };

  onVisibleChange = (v) => {
    const { props } = this;
    if (!("visible" in props)) {
      this.setState({
        visible: v,
      });
    }
    props.onVisibleChange(v);
  };

  getPopupElement = () => {
    const { props } = this;
    return React.cloneElement(props.overlay, {
      onClick: this.onClick,
    });
  };

  render() {
    const {
      prefixCls,
      children,
      transitionName,
      animation,
      align,
      placement,
      overlayClassName,
      overlayStyle,
      trigger,
    } = this.props;
    return (
      <Trigger
        prefixCls={prefixCls}
        ref={this.triggerRef}
        popupClassName={overlayClassName}
        popupStyle={overlayStyle}
        builtinPlacements={placements}
        action={trigger}
        popupPlacement={placement}
        popupAlign={align}
        popupTransitionName={transitionName}
        popupAnimation={animation}
        popupVisible={this.state.visible}
        popup={this.getPopupElement()}
        onPopupVisibleChange={this.onVisibleChange}
      >
        {children}
      </Trigger>
    );
  }
}

class LocationTree extends React.Component {
  state = {
    visible: false,
    inputValue: "",
    sel: "",
    expandedKeys: [],
    autoExpandParent: true,
    treeData: [],
    handleSelect: [],
  };

  onChange = (event) => {
    this.filterKeys = [];
    this.setState({
      inputValue: event.target.value,
    });
  };

  onVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  onSelect = (selectedKeys, info) => {
    this.setState({
      visible: false,
      sel: info.node.props.title,
    });
    this.props.handleSelect(info.node.props.eventKey);
  };

  onExpand = (expandedKeys) => {
    this.filterKeys = undefined;
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const result = await listLocation();
      const locationsById = {};
      result.data.forEach((location) => {
        locationsById[location.id] = {
          title: location.locationName,
          key: location.id,
          children: [],
        };
      });

      result.data.forEach((location) => {
        if (location.parentLocationId) {
          if (locationsById[location.parentLocationId]) {
            locationsById[location.parentLocationId].children.push(
              locationsById[location.id]
            );
          }
        }
      });

      const treeData = Object.values(
        result.data
          .filter((location) => location.parentLocationId === null)
          .reduce((acc, location) => {
            acc[location.id] = locationsById[location.id];
            return acc;
          }, {})
      );
      this.setState({ treeData });
    } catch (error) {
      console.error("Error fetching data", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  render() {
    const loop = (data) =>
      data.map((item) => {
        if (this.filterKeys && this.filterFn(item.title)) {
          this.filterKeys.push(item.title);
        }
        if (item.children) {
          return (
            <TreeNode key={item.key} title={item.title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={item.title} />;
      });
    let { expandedKeys } = this.state;
    let { autoExpandParent } = this.state;
    if (this.filterKeys) {
      expandedKeys = this.filterKeys;
      autoExpandParent = true;
    }

    const overlay = (
      <div>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelect}
          filterTreeNode={this.filterTreeNode}
        >
          {loop(this.state.treeData)}
        </Tree>
      </div>
    );

    return (
      <div>
        <p>Location</p>
        <DropdownTree
          trigger={["click"]}
          onVisibleChange={this.onVisibleChange}
          visible={this.state.visible}
          closeOnSelect={false}
          overlay={overlay}
          animation="slide-up"
        >
          <div className="demo-dropdown-trigger">{this.state.sel}</div>
        </DropdownTree>
      </div>
    );
  }
}

export default LocationTree;
