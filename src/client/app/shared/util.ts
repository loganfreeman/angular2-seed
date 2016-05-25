// Credits to Christian Johansen for util logic:
// https://github.com/cjohansen/react-sweeper

import {fromJS, List, Map} from 'immutable';

function partition(size:any, coll:any) {
  var res = <any>[];
  for (var i = 0, l = coll.size || coll.length; i < l; i += size) {
    res.push(coll.slice(i, i + size));
  }
  return fromJS(res);
}

function identity(v:any) {
  return v;
}

function prop(n:any) {
  return function (object:any) {
    return object instanceof Map ? object.get(n) : object[n];
  };
}

function keep(list:any, pred:any) {
  return list.map(pred).filter(identity);
}

function repeat(n:any, val:any) {
  const res = <any>[];
  while (n--) {
    res.push(val);
  }
  return List(res);
}

function shuffle(list:any) {
  return list.sort(function () { return Math.random() - 0.5; });
}

function zip(arrays:any[]) {
    return arrays[0].map(function(_:any,i:number){
        return arrays.map((array) => array[i]);
    });
}

export {partition, identity, prop, keep, repeat, shuffle, zip};
