(()=>{"use strict";let e=(e,t=null,l=null)=>({value:e||null,leftNode:t,rightNode:l});function t(l,r=0,o=l.length-1){if(r>o)return null;let i=parseInt((r+o)/2),h=e(l[i]);return h.leftNode=t(l,r,i-1),h.rightNode=t(l,i+1,o),h}const l=(e,t="",r=!0)=>{null!==e.rightNode&&l(e.rightNode,`${t}${r?"│   ":"    "}`,!1),console.log(`${t}${r?"└── ":"┌── "}${e.value}`),null!==e.leftNode&&l(e.leftNode,`${t}${r?"    ":"│   "}`,!0)};console.log("hi");let r=(o=[7,6,2,5,3,10,1,5,13,21,18,23,14,32],{root:t(o=[...new Set(o.sort(((e,t)=>e-t)))]),insert(t,l=this.root){return null===l?l=e(t):(t>l.value?l.rightNode=this.insert(t,l.rightNode):t<l.value&&(l.leftNode=this.insert(t,l.leftNode)),l)},deleteValue(e,t=this.root,l=null){if(null!==t){if(e>t.value)t.rightNode=this.deleteValue(e,t.rightNode,t);else if(e<t.value)t.leftNode=this.deleteValue(e,t.leftNode,t);else{if(null===t.leftNode)return t.rightNode;if(null===t.rightNode)return t.leftNode;t.value=this.minValue(t.rightNode),t.rightNode=this.deleteValue(t.value,t.rightNode)}return t}},minValue(e){let t=e.value;for(;null!=e.leftNode;)t=e.leftNode.value,e=e.leftNode;return t},find(e,t=this.root){return null===t||t.value===e?t:e>t.value?this.find(e,t.rightNode):e<t.value?this.find(e,t.leftNode):void 0},levelOrder(e=this.root,t=[],l=[]){if(l.push(e),null!==e){for(null!==e.leftNode&&t.push(e.leftNode),null!==e.rightNode&&t.push(e.rightNode);t.length;){let e=t[0];t.shift(),this.levelOrder(e,t,l)}return l}},inorder(e=this.root,t=[]){if(null!==e)return this.inorder(e.leftNode,t),t.push(e),this.inorder(e.rightNode,t),t},preorder(e=this.root,t=[]){if(null!==e)return t.push(e),this.preorder(e.leftNode,t),this.preorder(e.rightNode,t),t},postorder(e=this.root,t=[]){if(null!==e)return this.postorder(e.leftNode,t),this.postorder(e.rightNode,t),t.push(e),t},height(e=this.root,t=0){return null===e?0:Math.max(this.height(e.leftNode),this.height(e.rightNode))+1},depth(e,t=this.root,l=0){return null===t||t.value===e?l+1:e>t.value?this.depth(e,t.rightNode,l+=1):e<t.value?this.depth(e,t.leftNode,l+=1):void 0},isBalanced(e=this.root){let t=this.height(e.leftNode),l=this.height(e.rightNode);return Math.abs(t-l)<2},rebalance(){let e=this.levelOrder(),l=[];return e.forEach((e=>{l.push(e.value)})),l=[...new Set(l.sort(((e,t)=>e-t)))],this.root=t(l)}});var o;l(r.root)})();