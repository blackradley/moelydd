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

var Opportunity = function () {
    var self = this;
    self.description = ko.observable('');
    
    // Resources
    self.assets = ko.observable('');
    self.staff = ko.observable('');
    self.information = ko.observable('');
    self.support = ko.observable('');
    
    //Priorities
    self.constraintOperational = ko.observable('');
    self.constraintFinancial = ko.observable('');
    self.constraintPolitical = ko.observable('');

    //Actions
    self.actionVision = ko.observable('');
    self.actionFirstSteps = ko.observable('');
    self.actionDiscomfort = ko.observable('');
} 


function OpportunitiesVM() {
	var self = this;
    self.opportunities = ko.observableArray([]);
    
    self.AddOpportunity = function () {
    	var opportunity = new Opportunity().description('');
    	self.opportunities.push(opportunity);
    	//console.log('Added Opportunity')
    }
    
    self.RemoveOpportunity = function (record) {
        //console.log('Removing Opportunity');
        self.opportunities.remove(record);
    };
    
    // Complete if the opportunity description is more than 3 characters
    self.isComplete = ko.computed(function () {
        for (var i = 0; i < self.opportunities().length; i++) {
            if (ko.toJS(self.opportunities()[i].description().length) < 3)
                return false;
        }
        return true;
    });
    
    self.isResourcesComplete = ko.computed(function () {
        for (var i = 0; i < self.opportunities().length; i++) {
            if (ko.toJS(self.opportunities()[i].assets().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].staff().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].information().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].support().length) < 3)
                return false;
        }
        return true;
    });
    
    self.isPrioritiesComplete = ko.computed(function () {
        for (var i = 0; i < self.opportunities().length; i++) {
            if (ko.toJS(self.opportunities()[i].constraintOperational().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].constraintFinancial().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].constraintPolitical().length) < 3)
                return false;
        }
        return true;
    });
    
    self.isActionsComplete = ko.computed(function () {
        for (var i = 0; i < self.opportunities().length; i++) {
            if (ko.toJS(self.opportunities()[i].actionVision().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].actionFirstSteps().length) < 3)
                return false;
            if (ko.toJS(self.opportunities()[i].actionDiscomfort().length) < 3)
                return false;
        }
        return true;
    });
}

function Enterprise() {
	var self = this;
	self.intentVM = new IntentVM();
	self.opportunitiesVM = new OpportunitiesVM();
	self.opportunitiesVM.AddOpportunity();

}

var enterprise = new Enterprise();
ko.applyBindings(enterprise);