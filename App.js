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
                'ToDo'
            ],
            context: this.getContext(),
            features: [{
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name} ({rows.length})'
            }],
            storeConfig: {
                model: 'task',
                groupField: 'Owner',
                groupDir: 'ASC',
                fetch: ['Owner'],
                getGroupString: function(record) {
                    var owner = record.get('Owner');
                    return (owner && owner._refObjectName) || 'No Owner';
                }
            }
        });

        //API Docs: https://help.rallydev.com/apps/2.1/doc/
    }
});
