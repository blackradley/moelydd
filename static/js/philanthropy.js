/*
 * +----------------------+
 * |Philanthropy Strategy |
 * |----------------------|
 * |Intent - Socioeconomic|
 * |Intent - Impact       |
 * |Intent - Artistic     |    +-------------------------------+
 * |Themes (1 to Many)+------->|Theme                          |
 * +----------------------+    |-------------------------------|
 *                             |Type (Market, Service, Support)|
 *                             |Description                    |    +----------------------+
 *                             |Funding Type +--------------------->|Funding Types         |
 *                             |Constraints - Financial        |    |----------------------|
 *                             |Constraints - Operational      |    |Public Grants         |
 *                             |Constraints - Political        |    |Trusts and Foundations|
 *                             |Actions - Vision|              |    |Corporate Giving      |
 *                             |Actions - First Steps          |    |Community Giving      |
 *                             |Actions - Discomfort           |    |Major Donors          |
 *                             +-------------------------------+    |Patrons               |
 *                                                                  |Friends               |
 *                                                                  |Legacies              |
 *                                                                  |Membership            |
 *                                                                  |Object Sponsorship    |
 *                                                                  |Visitor Donations     |
 *                                                                  +----------------------+
 *
 * (diagram at http://www.asciiflow.com/#9011201194894153790/43257034)
 *
 */

/*
 * View Model for Intent
 */
function IntentVM() {
    var self = this;
    self.socioeconomic = ko.observable('');
    self.impact = ko.observable('');
    self.artistic = ko.observable('');
    self.isComplete = ko.computed(function () {
        if ((self.socioeconomic().length > 3) && (self.impact().length > 3) && (self.artistic().length > 3)) {
            return true;
        } else {
            return false;
        }
    });
}

/*
 * Object of managing the funding sources.
 */
var FundingSource = function (type) {
    var self = this;
    self.type = type;
    self.isSource = ko.observable(false);
    self.source = ko.observable('');
};

/*
 * A single theme and it's funding sources
 */
var Theme = function () {
    var self = this;
    self.type = ko.observable('');
    self.description = ko.observable('');

    self.fundingSources = ko.observableArray();

    //Funding sources, created as a look up object, to save repetition, since there are 12 of them.
    var fundingNames = new Array("public", "trusts", "corporate", "community", "major", "patrons", "friends", "legacies", "membership", "object", "visitor", "crowd");
    //self.fundingSources = ko.observableArray('');
    for (var i = 0; i < fundingNames.length; i++) {
        self.fundingSources.push(new FundingSource(fundingNames[i]));
        console.log('Added ');
        //self.fundingSources[self.fundingSources[i]] = new FundingSource(self.fundingSources[i]);
    }

    //Constraints
    self.isConstraintOperational = ko.observable();
    self.constraintOperational = ko.observable('');
    self.isConstraintFinancial = ko.observable();
    self.constraintFinancial = ko.observable('');
    self.isConstraintPolitical = ko.observable();
    self.constraintPolitical = ko.observable('');

    //Actions
    self.actionVision = ko.observable('');
    self.actionFirstSteps = ko.observable('');
    self.actionDiscomfort = ko.observable('');
};

/*
* View Model for Themes
*/
function ThemesVM() {
    var self = this;
    self.themes = ko.observableArray([]);
    self.AddTheme = function () {
        //create a new theme using our declared function. You must set some default values for you new object here too.
        var theme = new Theme().type(0).description('');
        self.themes.push(theme);
        //console.log('Added Theme');
    };
    self.RemoveTheme = function (record) {
        //console.log('Removing Theme');
        self.themes.remove(record);
    };

    // Complete if type of theme and description are complete
    self.isComplete = ko.computed(function () {
        for (var i = 0; i < self.themes().length; i++) {
            if (ko.toJS(self.themes()[i].type) == '')
                return false;
            if (ko.toJS(self.themes()[i].description().length) < 3)
                return false;
        }
        return true;
    });

    // Complete if funding is complete.  At least one check box must be checked
    // and the associated text field must have more than 3 characters in it.
    self.isFundingComplete = ko.computed(function () {
        for (var i = 0; i < self.themes().length; i++) {
            var countSources = 0;
            for (fundingSource in self.themes()[i].fundingSources) {
                //console.log("Funding Source " + ko.toJS(self.themes()[i].fundingSources[fundingSource].source));
                var isSource = ko.toJS(self.themes()[i].fundingSources[fundingSource].isSource);
                var source = ko.toJS(self.themes()[i].fundingSources[fundingSource].source);
                if ((isSource) && (source.length < 3))
                    return false;
                if (isSource)
                    countSources++;
            }
            if (countSources === 0)
                return false;
        }
        return true;
    });

    // Complete if constraints have more then 3 characters in them.
    self.isConstraintsComplete = ko.computed(function () {
        for (var i = 0; i < self.themes().length; i++) {
            if (ko.toJS(self.themes()[i].constraintOperational().length) < 3)
                return false;
            if (ko.toJS(self.themes()[i].constraintFinancial().length) < 3)
                return false;
            if (ko.toJS(self.themes()[i].constraintPolitical().length) < 3)
                return false;
        }
        return true;
    });

    // Complete if all the actions have more then 3 characters in them.
    self.isActionComplete = ko.computed(function () {
        for (var i = 0; i < self.themes().length; i++) {
            if (ko.toJS(self.themes()[i].actionVision().length) < 3)
                return false;
            if (ko.toJS(self.themes()[i].actionFirstSteps().length) < 3)
                return false;
            if (ko.toJS(self.themes()[i].actionDiscomfort().length) < 3)
                return false;
        }
        return true;
    });
}

/*
* Master View Model
*/
function Philanthropy() {
    var self = this;
    self.intentVM = new IntentVM();
    self.themesVM = new ThemesVM();
    self.themesVM.AddTheme(); //There has to be at least one theme

	self.save = function() {
		var saveData = ko.toJSON(self);
		localStorage.setItem('Philanthropy', saveData);
	}
}

var philanthropy = new Philanthropy();
ko.applyBindings(philanthropy);

if (window.localStorage) {
/*	var retrievedData = localStorage.getItem('Philanthropy');
	retrievedData = JSON.parse(retrievedData);
	if (retrievedData) {
		ko.mapping.fromJS(retrievedData, null, philanthropy);
	}*/
}

/*
 * Event handler to save data to localStorage every time a field is unfocussed
 */
$("input, textarea, select").on("blur", function() {
	philanthropy.save();
});