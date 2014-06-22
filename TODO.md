## What is this?

A really basic color palette builder.

### Tasks:

[X] When a color is added, clear the field and fill it with a new random color.
[X] Add validation to the input so that invalid colors cannot be added.
[X] Add a reset button that clears out existing colors.
[X] When a color is added, load the name from the COLOURlovers API. If it exists, add it underneath the hex label.
[X] Make the bars animate when a new color is added?
[ ] If you want to, spruce it up! Not mandatory. If you want to change/move things around, feel free.

### Notes:

The functionality for validating and fetching colors should be built modularly. Think `Color.validate(hex)` and `Color.fetch(hex, callback)`.