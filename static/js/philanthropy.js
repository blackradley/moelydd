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
 * A single theme and it's funding sources
 */
var Theme = function () {
    var self = this;
    self.type = ko.observable('');
    self.description = ko.observable('');

    //Funding sources
    self.fundingSourceIsPublic = ko.observable(false);
    self.fundingSourcePublic = ko.observable('');
    self.fundingSourceIsTrusts = ko.observable(false);
    self.fundingSourceTrusts = ko.observable('');

    self.fundingSourceIsCorporate = ko.observable(false);
    self.fundingSourceCorporate = ko.observable('');
    self.fundingSourceIsCommunity = ko.observable(false);
    self.fundingSourceCommunity = ko.observable('');

    self.fundingSourceIsMajor = ko.observable(false);
    self.fundingSourceMajor = ko.observable('');
    self.fundingSourceIsPatrons = ko.observable(false);
    self.fundingSourcePatrons = ko.observable('');

    self.fundingSourceIsFriends = ko.observable(false);
    self.fundingSourceFriends = ko.observable('');
    self.fundingSourceIsLegacies = ko.observable(false);
    self.fundingSourceLegacies = ko.observable('');

    self.fundingSourceIsMembership = ko.observable(false);
    self.fundingSourceMembership = ko.observable('');
    self.fundingSourceIsObject = ko.observable(false);
    self.fundingSourceObject = ko.observable('');

    self.fundingSourceIsVisitor = ko.observable(false);
    self.fundingSourceVisitor = ko.observable('');
    self.fundingSourceIsCrowd = ko.observable(false);
    self.fundingSourceCrowd = ko.observable('');

    //Constraints
    self.isConstraintOperational = ko.observable(false);
    self.constraintOperational = ko.observable('');
    self.isConstraintFinancial = ko.observable(false);
    self.constraintFinancial = ko.observable('');
    self.isConstraintPolitical = ko.observable(false);
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
        var returnBoolean = false;
        for (var i = 0; i < self.themes().length; i++) {
                //console.log("Funding Source " + ko.toJS(self.themes()[i].fundingSources[fundingSource].source));
                var theme = self.themes()[i];
                // Make sure one is checked.
                if (theme.fundingSourceIsPublic || theme.fundingSourceIsTrusts) returnBoolean = true;
                // Make sure that the information is completed.
                if (IsSourceInfoComplete(theme.fundingSourceIsPublic, theme.fundingSourcePublic) &&
                        IsSourceInfoComplete(theme.fundingSourceIsTrusts, theme.fundingSourceTrusts))
                    returnBoolean = false;
        }
        return returnBoolean;
    });

    function IsSourceInfoComplete(isSource, sourceDescription){
        var isSource = ko.toJS(isSource);
        var source = ko.toJS(sourceDescription);
        if ((isSource) && (source.length > 3)) return true;
        return false;
    }

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
	var retrievedData = localStorage.getItem('Philanthropy');
	retrievedData = JSON.parse(retrievedData);
/*	if (retrievedData) {
		ko.mapping.fromJS(retrievedData, null, philanthropy);
	}*/
}

/*
 * Event handler to save data to localStorage every time a field is unfocussed
 */
$("input, textarea, select").on("blur", function() {
	philanthropy.save();
});