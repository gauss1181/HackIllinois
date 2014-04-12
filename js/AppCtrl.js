function AppCtrl ($scope) {

    var App = {
        Tab : { main: true, settings: false },
        Settings: { integral: true, approximation: false, taylor: false, convergence: false },
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
            App.Settings.integral ? arr.push('Integrate:') : '';
            App.Settings.approximation ? arr.push('Euler Approximate:') : '';
            App.Settings.taylor ? arr.push('Convert to Taylor series:') : '';
            App.Settings.convergence ? arr.push('Determine convergence/divergence') : '';

            return arr[Math.floor(Math.random() * arr.length)];

        }();
        var first  = getRandomNumber(),
            second = getRandomNumber(),
            temp;
        switch (type) {
            case 'Euler Approximate:':
                if (first < second) {
                    temp = first;
                    first = second;
                    second = temp;
                }
                App.Task.response = first - second;
                break;
            case 'Integrate:':
                App.Task.response = first + second;
                break;
            case 'Convert to Taylor series:':
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
            case 'Determine convergence/divergence:':
                App.Task.response = first * second;
                break;
        };

        App.Task.text = type + ' ' + first + ' ' + second + ' = ?';
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
            if (!App.Settings.integral && !App.Settings.approximation &&
                !App.Settings.taylor && !App.Settings.convergence) {
            switch (type) {
                case 'integral':
                    App.Settings.integral = true;
                    break;
                case 'approximation':
                    App.Settings.approximation = true;
                    break;
                case 'taylor':
                    App.Settings.taylor = true;
                    break;
                case 'convergence':
                    App.Settings.convergence = true;
                    break;
                default:
                    console.log('Something wrong')
            }
            alert('You must select at least one item!');
            }
    }

    $scope.$watch('App.Settings.integral', function() {
        testTypes('integral');
        App.getTask();
    });
    $scope.$watch('App.Settings.approximation', function() {
        testTypes('approximation');
        App.getTask();
    });
    $scope.$watch('App.Settings.taylor', function() {
        testTypes('taylor');
        App.getTask();
    });
    $scope.$watch('App.Settings.convergence', function() {
        testTypes('convergence');
        App.getTask();
    });
}