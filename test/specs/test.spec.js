describe('Test Controller', () => {

  let controller;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function ($controller) {

    controller = $controller('TestController', {});

  }));

  it('should work with imports', () => {
    expect(controller).toBeDefined();
  });
});
