Ext.define('CustomApp', {
    // extend: 'Rally.app.App',
    extend: 'Rally.app.TimeboxScopedApp',
    scopeType: 'iteration',
    componentCls: 'app',
    launch: function() {
        //Write app code here
        
        var filters = [], timeboxScope = this.getContext().getTimeboxScope();
        if(timeboxScope) {
            console.log('pushing');
            filters.push(timeboxScope.getQueryFilter());
        }
    
        // this.iterationCombobox = this.add({
        //     xtype: 'rallyiterationcombobox',
        //     listeners: {
        //         ready: this._onIterationComboboxLoad,
        //         change: this._onIterationComboboxLoad,
        //         scope: this
        //     }
        // });

        this.board = this.add({
            xtype: 'rallygrid',
            columnCfgs: [
                'FormattedID',
                'Name',
                'State',
                'ToDo',
                'c_TeamMembers'
            ],
            context: this.getContext(),
            features: [{
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name} ({rows.length})'
            }],
            storeConfig: {
                model: 'task',
                groupField: 'c_TeamMembers',
                groupDir: 'ASC',
                fetch: ['c_TeamMembers'],
                filters: filters,
                getGroupString: function(record) {
                    var owner = record.get('c_TeamMembers');
                    return (owner) || 'No Team Member';
                }
            }
        });
    },
    
    // _onIterationComboboxLoad: function(){
    //         console.log("SEAN");
    // },
    
    onTimeboxScopeChange: function(newTimeboxScope) {
        this.callParent(arguments);
        console.log(newTimeboxScope.getQueryFilter());
        this.board.refresh({
            storeConfig: {
                filters: [
                    newTimeboxScope.getQueryFilter()
                ]
            }
        });
    }
});
