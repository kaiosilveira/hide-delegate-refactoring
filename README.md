[![Continuous Integration](https://github.com/kaiosilveira/hide-delegate-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/hide-delegate-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Hide delegate

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
manager = aPerson.department.manager;
```

</td>

<td>

```javascript
manager = aPerson.manager;

class Person {
  get manager() {
    return this._department.manager;
  }
  // ...
}
```

</td>
</tr>
</tbody>
</table>

**Inverse of: [Remove middle man](https://github.com/kaiosilveira/remove-middle-man-refactoring)**

Encapsulation is at the roots of good code design, it helps in keeping coupling low by hiding the internal details of a given class/module, which allows for better and safer refactorings, freedom for exploring new ideas (which eventually leads to deeper, more supple domain models). This refactoring sheds some light on how to hide our delegates, therefore keeping our data encapsulated.

## Working example

Our working example is simple and straightforward: we have a `Person` class that contains some `department` info. The info related to a person's manager is inside the `department` reference, but that'd be great if we could hide the implementation details from the clients.

### Test suite

A supporting test suite was added to make sure none of our refactoring steps introduced any errors. It covers the client code resolving the `manager` info of a given `person`.

```javascript
describe('getManager', () => {
  it('should fetch the manager of a person', () => {
    const department = new Department();
    department.chargeCode = '123';
    department.manager = 'Martin';

    const aPerson = new Person({ name: 'Kaio' });
    aPerson.department = department;

    expect(getManager(aPerson)).toEqual('Martin');
  });
});
```

### Steps

We start by adding a `manager` getter to `Person`:

```diff
diff --git a/src/Person.js b/src/Person.js
@@ -14,5 +14,8 @@
export class Person {
   set department(arg) {
     this._department = arg;
   }
-}

+  get manager() {
+    return this._department.manager;
+  }
+}
```

Then, we can simply update our callers to read the `manager` info directly from `Person` instead of accessing its `department`:

```diff
diff --git a/src/client/index.js b/src/client/index.js
@@ -1,4 +1,4 @@
 export function getManager(aPerson) {
-  const manager = aPerson.department.manager;
+  const manager = aPerson.manager;
   return manager;
 }

```

And that's it, as simple as that! In a real-world scenario, though, this could be a gradual process where we update caller by caller at a varying pace. The code would remain functional until we eventually finish updating all callers and remove the `department` getter completely:

```diff
diff --git a/src/Person.js b/src/Person.js
@@ -7,10 +7,6 @@
export class Person {
     return this._name;
   }

-  get department() {
-    return this._department;
-  }
-
   set department(arg) {
     this._department = arg;
   }
```

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                           | Message                                                         |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [872871b](https://github.com/kaiosilveira/hide-delegate-refactoring/commit/872871bbde7e8ceb0dce8d4ec4fce1c227b2ff28) | add a get to manager at `Person`                                |
| [d1c4386](https://github.com/kaiosilveira/hide-delegate-refactoring/commit/d1c43868f99b4dab76a057e9d4d98309e5d81681) | update `Person` clients to read `manager` prop directly from it |
| [a4f2280](https://github.com/kaiosilveira/hide-delegate-refactoring/commit/a4f22801d0b44a98805dbdbbad4fc575b5fbefb2) | remove `department` getter at `Person`                          |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/hide-delegate-refactoring/commits/main).
