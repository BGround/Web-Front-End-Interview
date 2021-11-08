## 说明
此题需要理解的知识点有，React中生命周期钩子函数和state与props之间的区别

## 解析

**state && props**
props是组件对外的参数对象，state是组件内对象的相当于函数全局变量。

## 实例

**state触发更新**
```
import React from 'react';
import Info from './Info.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InfoText: 'react study'
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log('home getDerivedStateFromProps', 'props='+ Object.values(props), '  state='+ Object.values(state));
        return {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('home shouldCOmponentUpdate:', 'nextProps='+ Object.values(nextProps), '  nextState='+ Object.values(nextState));
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('home getSnapshotBeforeUpdate', 'prevProps='+ Object.values(prevProps), '  prevState='+ Object.values(prevState));
        return {};
    }

    componentDidMount() {
        console.log('home componentDidMount');
        setTimeout(() => this.setState({
            InfoText: 'update now!'
        }), 2000);
    }

    componentDidUpdate() {
        console.log('home componentDidUpdate');
    }

    render() {
        console.log('home render');
        return (
            <div>
                InfoText:
                <span>{this.state.InfoText}</span>
								{/* <Info InfoText={this.state.InfoText} /> */}
            </div>
        );
    }
}
```

当state更新时，触发的生命周期函数有

* Home.js:18 home getDerivedStateFromProps props=   state=update now!
* Home.js:18 home shouldComponentUpdate: nextProps=   nextState=update now!
* Home.js:39 home render
* Home.js:23 home getSnapshotBeforeUpdate prevProps=   prevState=react study
* Home.js:35 home componentDidUpdate


**当props更新时**
```
import React from 'react';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static getDerivedStateFromProps(props, state) {
        console.log('Info getDerivedStateFromProps', 'props='+ Object.values(props), '  state='+ Object.values(state));
        return {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Info shouldCOmponentUpdate:', 'nextProps='+ Object.values(nextProps), '  nextState='+ Object.values(nextState));
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Info getSnapshotBeforeUpdate', 'prevProps='+ Object.values(prevProps), '  prevState='+ Object.values(prevState));
        return {};
    }

    componentDidMount() {
        console.log('Info componentDidMount');
        setTimeout(() => this.setState({
            InfoText: 'update now!'
        }), 2000);
    }

    componentDidUpdate() {
        console.log('Info componentDidUpdate');
    }

    render() {
        const {InfoText} = this.props;
        return (
            <div>
                <p>{InfoText}</p>
            </div>
        );
    }
}
```

当props更新时，子组件触发的生命周期函数有

* Info.js:9  Info getDerivedStateFromProps props=update now!   state=update now!
* Info.js:14 Info shouldCOmponentUpdate: nextProps=update now!   nextState=update now!
* Info.js:35 Info render
* Info.js:19 Info getSnapshotBeforeUpdate prevProps=react study   prevState=update now!
* Info.js:31 Info componentDidUpdate


## 总结

**共同点:** 更新时触发的生命周期函数时相同的

**不同点:** 

|    state更新是否有值     | prevState |  prevProps | nextState | nextProps |
|          -              |    -      |     -      |    -      |    -      |
|getDerivedStateFromProps |   有      |     /      |       /   |    无     |
|shouldCOmponentUpdate    |   有      |     /      |      /    |    无     |
|getSnapshotBeforeUpdate  |   有      |     /      |      /    |    无     |


|    props更新是否有值     | prevState |  prevProps | nextState | nextProps |
|          -              |    -      |     -      |    -      |    -      |
|getDerivedStateFromProps |   无      |     /      |       /   |    有     |
|shouldCOmponentUpdate    |   无      |     /      |      /    |    有     |
|getSnapshotBeforeUpdate  |   无      |     /      |      /    |    有     |

