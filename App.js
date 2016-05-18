Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //Write app code here

        this.add({
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
                getGroupString: function(record) {
                    var owner = record.get('c_TeamMembers');
                    return (owner && owner._refObjectName) || 'No Team Member';
                }
            }
        });

        //API Docs: https://help.rallydev.com/apps/2.1/doc/
    }
});
