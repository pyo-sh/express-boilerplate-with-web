import { observable, observe } from '@src/core/Observer.js';
import { updateElements, switchElement, updateAttributes } from '@src/core/elementControler.js';

export default class Component{
    _element;
    _childComponents;
    _props;
    _state;
    constructor (props, element){
        if(!element) {
            this._element = document.createElement('temp');
            const virtualParent = document.createElement('temp');
            virtualParent.appendChild(this._element);
        }
        else this._element = element;
        this._childCount = 0;
        this._childComponents = [];
        this._props = props;
        this._setUpState();
    }

    initState() { return {}; }
    _setUpState() {
        this._state = observable(this.initState());
        observe(() => { this._render(); });
    }
    setState(newState) {
        Object.entries(newState).forEach(([key, val]) => {
            const prevVal = this._state[key];
            if(prevVal !== val)
                this._state[key] = val;
        })
    }

    ComponentWillMount() {}
    ComponentDidMount() {}
    childComponent = (ComponentClass, props = {}) => {
        if(!ComponentClass) return '';
        const { _childCount, _childComponents } = this;
        const targetChild = _childComponents[_childCount || -1] || {};
        const prevProp = targetChild?._props || {};
        const isDiff = Object.entries(props)
            .some((key, value) => prevProp[key] !== value);

        // 자식 컴포넌트 새로 추가
        if(!Object.keys(targetChild).length) {
            this._childComponents.push(new ComponentClass(props));
        }
        // props로 렌더링 결정
        else if(isDiff) {
            delete _childComponents[_childCount];
            _childComponents[_childCount] = new ComponentClass(props);
        }

        this._childCount++;
        return `<childComponent></childComponent>`;
    }
    _ComponentChildMount() {
        const { _element, _childComponents } = this;
        const targetElements = [..._element.getElementsByTagName('childComponent')];
        targetElements.forEach((target, i) => switchElement(target, _childComponents[i]._element));
        this._childCount = 0;
    }

    template() { return '' }
    _render() {
    // virtualDOM을 로직대로 렌더링
        // Component Mount 전 실행할 내용
        this.ComponentWillMount();

        // virtualDom
        const virtualDOM = document.createElement('div');
        virtualDOM.innerHTML = this.template();
        if(!virtualDOM.firstElementChild){
            virtualDOM.appendChild(document.createElement('div'));
        }
        // virtualDOM을 통해 변경사항 확인
        const targetElement = virtualDOM.firstElementChild;
        if(this._element.nodeName !== targetElement.nodeName) {
            this._element = targetElement;
        } else{
            updateAttributes(this._element, targetElement);
            updateElements(this._element, targetElement);
        }

        // 자식 Component 할당
        this._ComponentChildMount();
        // DOM 이벤트 설정
        requestAnimationFrame(() => this.setEvent());
        // Component Mount 후 실행할 내용
        this.ComponentDidMount();
    }
    setEvent() {}
    setEventListener = (queryString, type, callback) => {
        let targetElement = '';
        if(queryString === this._element) targetElement = this._element;
        else targetElement = this._element.querySelector(queryString);
        targetElement?.removeEventListener(type, callback);
        targetElement?.addEventListener(type, callback);
    }
}
