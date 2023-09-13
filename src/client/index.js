export function getManager(aPerson) {
  const manager = aPerson.department.manager;
  return manager;
}
