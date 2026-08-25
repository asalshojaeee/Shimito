# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models



class Companies(models.Model):
    id = models.IntegerField(primary_key=True)
    created_at = models.DateTimeField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    img = models.CharField(max_length=500, blank=True, null=True)
    services = models.JSONField(blank=True, null=True)
    foundationyear = models.IntegerField(db_column='foundationYear', blank=True, null=True)  # Field name made lowercase.
    contactnumber = models.CharField(db_column='contactNumber', max_length=50, blank=True, null=True)  # Field name made lowercase.
    registrationnumber = models.CharField(db_column='registrationNumber', max_length=100, blank=True, null=True)  # Field name made lowercase.
    address = models.TextField(blank=True, null=True)
    nationalid = models.CharField(db_column='nationalId', max_length=50, blank=True, null=True)  # Field name made lowercase.
    resume = models.TextField(blank=True, null=True)
    aboutco = models.TextField(db_column='aboutCo', blank=True, null=True)  # Field name made lowercase.
    user_id = models.IntegerField(blank=True, null=True)
    imgpath = models.CharField(db_column='imgPath', max_length=500, blank=True, null=True)  # Field name made lowercase.
    certificates = models.JSONField(blank=True, null=True)
    portfolios = models.JSONField(blank=True, null=True)
    video = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'companies'


