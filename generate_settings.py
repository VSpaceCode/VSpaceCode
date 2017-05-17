#!/usr/bin/env python3
"""Generate the VSCode settings from the VSpaceCode config file."""

import json
from collections import OrderedDict

import yaml


def get_config():
    """Read, parse and return the VSpaceCode config file."""
    with open('config.yml', 'r') as file:
        return yaml.load(file)


def generate_settings(config):
    """Generate the VSCode settings from the config."""
    # Prepare result dictionnary
    result = OrderedDict()
    # Set leader configuration
    result["vim.leader"] = config["leader"]
    # Add individual bindings
    other_modes = list()
    for binding in config['bindings']:
        entry = OrderedDict()
        # Forcing keys as string otherwise VSCode fails to load correctly
        entry["before"] = [str(k) for k in binding["keys"]]
        entry["after"] = []
        entry["commands"] = [OrderedDict([('command', binding['command']),
                                          ('args', [])])]
        other_modes.append(entry)
    result["vim.otherModesKeyBindingsNonRecursive"] = other_modes
    return result


def main():
    """Run the script."""
    config = get_config()
    settings = generate_settings(config)
    print(json.dumps(settings, indent=4))


if __name__ == '__main__':
    main()
