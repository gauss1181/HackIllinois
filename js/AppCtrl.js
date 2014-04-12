function AppCtrl ($scope) {

    var App = {
        Tab : { main: true, settings: false },
        Settings: { add: true, sub: false, divide: false, multiply: false },
        Result: { success: 0, errors: 0 },
        Task: {text: '1', response: '', userResponse: ''}
    }
    App.validation = function() {
            if (App.Task.userResponse &&
                App.Task.userResponse.length > 0 &&
                angular.isNumber(+App.Task.userResponse) &&
                +App.Task.userResponse > 0)  {
                App.Task.userResponse = Math.floor(+App.Task.userResponse);
            } else {
                App.Task.userResponse = App.Task.userResponse.slice(0 , App.Task.userResponse.length - 1);
            }
    };

    App.getTask = function(){
        var getRandomNumber = function () {
            var number = Math.floor(Math.random() * 10);
            if (number === 0) { number = getRandomNumber(); }
            return number;
        };
        var type = function () {
            var arr = [];
            App.Settings.add ? arr.push('+') : '';
            App.Settings.sub ? arr.push('-') : '';
            App.Settings.divide ? arr.push('/') : '';
            App.Settings.multiply ? arr.push('*') : '';

            return arr[Math.floor(Math.random() * arr.length)];

        }();
        var first  = getRandomNumber(),
            second = getRandomNumber(),
            temp;
        switch (type) {
            case '-':
                if (first < second) {
                    temp = first;
                    first = second;
                    second = temp;
                }
                App.Task.response = first - second;
                break;
            case '+':
                App.Task.response = first + second;
                break;
            case '/':
                if (first < second) {
                    temp = first;
                    first = second;
                    second = temp;
                }
                if (first % second !== 0) {
                    temp = first % second;
                    first = first + second - temp;
                }
                App.Task.response = first / second;
                break;
            case '*':
                App.Task.response = first * second;
                break;
        };

        App.Task.text = first + type + second + ' = ?';
    };

    App.getTask();

    App.testing = function () {
        if (+App.Task.userResponse === App.Task.response ) {
            App.Result.success += 1;
        } else {
            App.Result.errors += 1;
        }

        App.Task.userResponse = '';
        App.getTask();
    };

    $scope.App = App;

    var testTypes = function (type) {
            if (!App.Settings.add && !App.Settings.sub &&
                !App.Settings.divide && !App.Settings.multiply) {
            switch (type) {
                case 'add':
                    App.Settings.add = true;
                    break;
                case 'sub':
                    App.Settings.sub = true;
                    break;
                case 'divide':
                    App.Settings.divide = true;
                    break;
                case 'multiply':
                    App.Settings.multiply = true;
                    break;
                default:
                    console.log('Something wrong')
            }
            alert('You must select at least one item!');
            }
    }

    $scope.$watch('App.Settings.add', function() {
        testTypes('add');
        App.getTask();
    });
    $scope.$watch('App.Settings.sub', function() {
        testTypes('sub');
        App.getTask();
    });
    $scope.$watch('App.Settings.divide', function() {
        testTypes('div');
        App.getTask();
    });
    $scope.$watch('App.Settings.multiply', function() {
        testTypes('mul');
        App.getTask();
    });
}