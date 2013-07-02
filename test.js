var test = require('tape')
var become = require('./index')


test('add class and wrap text', function(t){
  t.plan(1)

  var originalElement = document.createElement('div')
  originalElement.innerHTML = "Testing 123 <span>some stuff</span>"

  var newHtml = "<div class='test2'>Testing 123 <span><strong>some</strong> stuff</span></div>"

  become(originalElement, newHtml)
  elementEqual(t, originalElement, newHtml)
})

test('add new elements', function(t){
  t.plan(1)

  var originalElement = document.createElement('ul')
  originalElement.innerHTML = "<li>Test 123</li><li>Test 1234</li>"

  var newHtml = "<ul><li>Test 123</li><li>Test 1234</li><li>Test 12345</li><li>Test 123456</li></ul>"

  become(originalElement, newHtml)
  elementEqual(t, originalElement, newHtml)
})

test('add new elements (with spaces)', function(t){
  t.plan(1)

  var originalElement = document.createElement('ul')
  originalElement.innerHTML = "<li>Test 123</li><li>Test 1234</li>"

  var newHtml = "<ul><li>Test 123</li> <li>Test 1234</li> <li>Test 12345</li> <li>Test 123456</li></ul>"

  become(originalElement, newHtml)
  elementEqual(t, originalElement, newHtml)
})

test('insert same element', function(t){
  t.plan(1)

  var originalElement = document.createElement('div')
  originalElement.innerHTML = "<div>Test 123</div><div>Test 1234</div>"

  var newHtml = "<div><div>Test 123</div><div>Insert</div><div>Test 1234</div></div>"

  become(originalElement, newHtml)
  elementEqual(t, originalElement, newHtml)
})

test('insert same element with identifiers', function(t){
  t.plan(3)

  var originalElement = document.createElement('div')
  originalElement.innerHTML = "<div id='1'>Test 123</div><div id='2'>Test 1234</div>"

  var node1 = originalElement.childNodes[0]
  var node2 = originalElement.childNodes[1]


  var newHtml = "<div><div id='1'>Test 123</div><div id='3'>Insert</div><div id='2'>Test 1234</div></div>"

  become(originalElement, newHtml, {uniqueAttribute: 'id'})
  elementEqual(t, originalElement, newHtml)

  t.ok(originalElement.childNodes[0] == node1, 'node 1 is still id 1')
  t.ok(originalElement.childNodes[2] == node2, "node 2 is still id 2")
})

test('insert different element', function(t){
  t.plan(1)

  var originalElement = document.createElement('div')
  originalElement.innerHTML = "<div>Test 123</div><div>Test 1234</div>"

  var newHtml = "<div><div>Test 123</div><span>Insert</span><div>Test 1234</div></div>"

  become(originalElement, newHtml)
  elementEqual(t, originalElement, newHtml)
})

test('reorder elements', function(t){
  t.plan(3)

  var originalElement = document.createElement('div')
  originalElement.innerHTML = "<div id='1'>Test 123</div><div id='2'>Test 1234</div><div id='3'>Insert</div>"

  var node1 = originalElement.childNodes[0]
  var node2 = originalElement.childNodes[1]
  var node3 = originalElement.childNodes[2]

  var newHtml = "<div><div id='1'>Test 123</div><div id='3'>Insert</div><div id='2'>Test 1234</div></div>"

  become(originalElement, newHtml, {uniqueAttribute: 'id'})
  elementEqual(t, originalElement, newHtml)

  t.ok(originalElement.childNodes[0] == node1, 'node 1 is still id 1')
  t.ok(originalElement.childNodes[2] == node2, "node 2 is still id 2")
})

function elementEqual(t, original, html, msg){
  var wrapperOriginal = document.createElement('div')
  wrapperOriginal.appendChild(original.cloneNode(true))

  var wrapperNew = document.createElement('div')
  wrapperNew.innerHTML = html

  t.equal(wrapperOriginal.innerHTML, wrapperNew.innerHTML, msg)
}